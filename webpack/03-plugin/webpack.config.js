const path = require("path");
// var HtmlWebpackPlugin = require("html-webpack-plugin");
const ElementlistWbpackPlugin = require("./plugins/element-list-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    // entry: ["./src/index.js", "./src/detail.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new ElementlistWbpackPlugin()
        // new HtmlWebpackPlugin({
        //     title: "My App",
        //     filename: "index.html",
        //     template: "./src/index.html",
        // })
    ],
    mode: "development",
};
