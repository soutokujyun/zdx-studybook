const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const glob = require("glob");
const setMap = () => {
    // 等价交换，炼金术不变的原则
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));

    entryFiles.map((item, index) => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/(.*)\/index\.js$/);
        const pageName = match[1];
        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: `./src/${pageName}/index.html`,
                filename: `${pageName}.html`,
            })
        );
    });

    console.log(entryFiles);
    return {
        entry,
        htmlWebpackPlugins,
    };
};

const { entry, htmlWebpackPlugins } = setMap();

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, "./mpa"),
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
                test: /\.(eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "../",
                    },
                },
            },
        ],
    },
    plugins: [
        ...htmlWebpackPlugins,
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new CleanWebpackPlugin(),
    ],
};
