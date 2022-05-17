const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules:[
        {
          test: /\.vue$/,
          use: "vue-loader"
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
          test: /\.css$/,
          use: [
              // 插件需要参与模块解析，须在此设置此项，不再需要style-loader
              process.env.NODE_ENV !== 'production'
              ? 'vue-style-loader'
              : MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader'
          ],
        },
        {
          test: /\.(eot|ttf|otf|woff2?)(\?\S*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets',
              },
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
          use: [
            {
                loader: "url-loader",
                options: {
                    limit: 10240,
                    name: "[name]_[hash:6].[ext]",
                    outputPath: "assets",
                },
            },
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 4096,
                name: "[name]_[hash:6].[ext]",
                outputPath: "assets",
                publicPath: (url, resourcePath, context) => {
                  return `../wp-content/plugins/vue-create-post-type/assets/${url}`
                }
              },
            },
          ],
          exclude: /node_modules/,
        },
    ]
  },
  // 优化
  optimization: {
    splitChunks: {
      // 缓存组
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    // 优化： 压缩css文件
    // minimize: true, // 开发环境下要同时开启
    minimizer: [
      new TerserPlugin(
        {
          // cache: true,
          parallel: true,
          extractComments: false,
          // sourceMap: true,
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            safari10: true
          }
        }
      )
    ] 
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // 输出⽂件的名字
    }),
    new VueLoaderPlugin()
  ]
};