const path = require("path");
// 抽离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    resolveLoader: {
        modules: ["node_modules", "./myLoaders"],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    "k-style-loader",
                    "k-css-loader",
                    // "postcss-loader",
                    "k-less-loader",
                ],
            },
            // {
            //     test: /\.js$/,
            //     // use: {
            //     //     loader: path.resolve(
            //     //         __dirname,
            //     //         "./myLoaders/replace-loader.js"
            //     //     ),
            //     //     options: {
            //     //         name: "参数",
            //     //     },
            //     // },
            //     // use: [
            //     //     {
            //     //         loader: path.resolve(
            //     //             __dirname,
            //     //             "./myLoaders/replace-loader.js"
            //     //         ),
            //     //     },
            //     //     {
            //     //         loader: path.resolve(
            //     //             __dirname,
            //     //             "./myLoaders/replace-loader-async.js"
            //     //         ),
            //     //         options: {
            //     //             name: "参数",
            //     //         },
            //     //     },
            //     // ],
            //     use: [
            //         "replace-loader",
            //         {
            //             loader: "replace-loader-async",
            //             options: {
            //                 name: "参数",
            //             },
            //         },
            //     ],
            // },
        ],
    },
    mode: "development",
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "index.html",
        }),
        new MiniCssExtractPlugin(),
    ],
};
