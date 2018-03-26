import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as nodeExternals from 'webpack-node-externals'
import * as VueSSRServerPlugin from 'vue-server-renderer/server-plugin'
import BaseConfiguration from './base'
import { getPath } from './utils'

export default merge(BaseConfiguration, {
  target: 'node',
  devtool: 'source-map',
  entry: getPath('src/entry-server.ts'),
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals({
    whitelist: [/\.css$/, /\.styl$/]
  })],
  plugins: [
    new webpack.DefinePlugin({
      isServer: true,
      isClient: false
    }),
    new VueSSRServerPlugin()
  ]
})
