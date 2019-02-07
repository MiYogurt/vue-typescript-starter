import { Configuration, ProvidePlugin } from 'webpack'
import * as webpack from 'webpack'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import { concat } from 'ramda'
import { getPath } from './utils'

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = 'prod' === process.env.NODE_ENV

const commonPlugins = [
  new VueLoaderPlugin(),
  new ProvidePlugin({
    R: ['ramda/dist/ramda.js'],
    Rx: ['rxjs']
  })
]
const concatCommon = concat(commonPlugins)

const prodPlugins = concatCommon([
  new ExtractTextPlugin({
    filename: 'common.[hash].css'
  })
])

// const devPlugins = concatCommon([new FriendlyErrorsWebpackPlugin()])
const devPlugins = concatCommon([])

const babelrc = {
  presets: [
    [
      '@vue/app'
    ],
    ["@babel/preset-typescript", { isTSX: true, allExtensions: true, jsxPragma: 'h' }],
    '@babel/preset-env'
  ],
  plugins: [
    [
      'ramda',
      {
        useES: true
      }
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "transform-class-properties"
  ]
}

const publicPath = '/dist/'

const BaseConfiguration: Configuration = {
  devtool: isProd ? false : 'inline-source-map',
  mode: isProd ? 'production' : 'development',
  output: {
    path: getPath('dist'),
    chunkFilename: '[name].[hash].bundle.js',
    filename: '[name].[hash].js',
    publicPath: '/dist/'
  },
  resolve: {
    alias: {
      public: getPath('public'),
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json']
  },
  plugins: isProd ? prodPlugins : devPlugins,
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  module: {
    unknownContextCritical: false,
    noParse: /es6-promise/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: isProd,
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            styl: 'vue-style-loader!css-loader!stylus-loader'
          }
        }
      },
      {
        test: /\.css$/,
        oneOf: [
          // 这里匹配 `<style module>`
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
          },
          // 这里匹配普通的 `<style>` 或 `<style scoped>`
          {
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        options: { appendTsSuffixTo: [/\.vue$/] }
      },
      {
        test: /\.tsx$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        use: [{ loader: 'babel-loader', options: babelrc }]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]?[hash]' }
      }
    ]
  }
}

export default BaseConfiguration
