const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.js",
        list: "./src/list.js",
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
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader",
                ],
            },
            // {
            //     test: /\.(png|jpe?g|gif)$/,
            //     use: {
            //         loader: "file-loader",
            //         options: {
            //             name: "[name].[ext]",
            //             outputPath: "images/",
            //             publicPath: "../images",
            //         },
            //     },
            // },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: "url-loader", // url-loader包含所有file-loader的功能
                    options: {
                        name: "[name].[ext]",
                        outputPath: "images/",
                        publicPath: "../images",
                        limit: 1024 * 3, //阈值，超过阈值的图片会独立文件，没有错过会处理成base64
                    },
                },
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/, // 字体文件配置
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        publicPath: "../",
                        // outputPath: "../",
                    },
                },
            },
        ],
    },
    devtool: "source-map", // 错误代码提示源文件
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 8081,
        proxy: {
            "/api": {
                target: "http://localhost:9092",
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "index.html",
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/list.html"),
            filename: "list.html",
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new CleanWebpackPlugin(),
    ],
};
