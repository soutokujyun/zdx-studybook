const path = require("path");

// 热模块替换 HMR(Hot Module Replacement)
// 本质上是对模块的监听，但监听到css模块代码改变了，则动态的替换这个模块的代码
// 没有修改的模块就不动
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 自定义插件
// const txtWebpackPlugin = require("./myPlugins/text-webpack-plugin.js");
const packlistWebpackPlugin = require("./myPlugins/packlist-webpack-plugin.js");

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            // babel
            {
                test: /\.js$/,
                use: "babel-loader",
                /*{
                     loader: "babel-loader",
                    options: {
                        把这一段挪到.babelrc 文件上
                        presets: [
                            // "@babel/preset-env",
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        chrome: "66",
                                        edge: "16",
                                    },
                                    corejs: 2, // 核心库版本 3.x最新 npm i core-js@3  3比2大了很多 所以使用ES6\7\8一般选2
                                    useBuiltIns: "usage", // 按需注入 // entry usage false
                                },
                            ],
                        ],
                        
                    },
                },*/
            },
        ],
    },
    devtool: "source-map", // 错误代码提示源文件
    devServer: {
        contentBase: "./dist",
        open: true,
        hot: true,
        // 即便HMR不生效，浏览器也不自动刷新，就开启hotOnly,就是关闭浏览器的功能
        hotOnly: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({ filename: "css/[name].css" }),
        new webpack.HotModuleReplacementPlugin(),
        // new txtWebpackPlugin({
        //     name: "zdx",
        // }),
        new packlistWebpackPlugin(),
        new CleanWebpackPlugin(),
    ],
};
