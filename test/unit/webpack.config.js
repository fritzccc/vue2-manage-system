const nodeExternals = require('webpack-node-externals')
var isTest = process.env.NODE_ENV === 'test';
var path = require('path');
module.exports = {
  externals: [nodeExternals()],
  // devtool: 'inline-cheap-module-source-map',
  devtool: 'eval',
  output: {
    // IDE Optimization
    devtoolModuleFilenameTemplate: '[absolute-resources-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resources-path]?[hash]'
  },
  // target: 'node',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ].concat(
      isTest ? {
        test: /\.(js|ts)/,
        include: path.resolve('src'), // instrument only testing sources with Istanbul, after ts-loader runs
        loader: 'istanbul-instrumenter-loader'
      }: [],
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'ts-loader'
      }
    )
  }
}