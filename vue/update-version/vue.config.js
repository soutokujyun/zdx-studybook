const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const VersionPlugin = require('./webpackplugins/version-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    const version = new Date().getTime()
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        VUE_APP_VERSION: String(version)
      }
    }))
    // 生产环境
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new VersionPlugin({
        'version': JSON.stringify(version)
      }))
    }
  }
})
