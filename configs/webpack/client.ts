import * as VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import * as merge from 'webpack-merge'
import BaseConfiguration from './base'
import { getPath } from './utils'
import {
  Configuration,
  HotModuleReplacementPlugin,
  DefinePlugin
} from 'webpack'

const isProd = 'prod' === process.env.NODE_ENV

const clientConfiguration = merge(BaseConfiguration, {
  entry: {
    app: getPath('src/entry-client.ts')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json', '.styl', '.css', '.sass', '.scss'],
    alias: { vue$: 'vue/dist/vue.esm.js' }
  },
  plugins: [
    new DefinePlugin({
      isClient: true,
      isServer: false
    }),
    new VueSSRClientPlugin()
  ]
})

export default clientConfiguration
