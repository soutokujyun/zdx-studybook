const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");

const compiler = webpack(webpackConfig);

Object.keys(compiler.hooks).forEach((hookname) => {
    compiler.hooks[hookname].tap("laozeng", () => {
        console.log(`run------>${hookname}`);
    });
});

compiler.run();
// 执行 node ./src/webpackplugin.js
