const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.config');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'development',
  // devtool:"inline-source-map",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 生产环境
    ]
  }
});