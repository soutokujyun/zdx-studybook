const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 插件需要参与模块解析，须在此设置此项，不再需要style-loader
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            }
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "index.html",
        }),
        new MiniCssExtractPlugin(),
    ],
    mode: "development",
}