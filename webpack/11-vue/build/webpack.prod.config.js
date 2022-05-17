const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.config');
module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'none',
  plugins: [
    new CleanWebpackPlugin()
  ]
});