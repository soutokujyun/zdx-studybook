class TextWebpackPlugin {
    constructor(options) {
        console.log(options);
    }
    // 帮助插件接收complier类
    apply(compiler) {
        // emit是异步的钩子，所以需要用tapAsync出发
        // 其他同步的钩子可以用tap出发
        // TextWebpackPlugin 事件名
        //
        compiler.hooks.emit.tapAsync("TextWebpackPlugin", (compilation, cb) => {
            compilation.assets["zdx.txt"] = {
                source: function () {
                    // 定义文件的内容
                    return "川建国";
                },
                size: function () {
                    // 定义文件体积
                    return 1024;
                },
            };
            cb();
        });

        // 同步类型钩子
        compiler.hooks.compile.tap("TextWebpackPlugin", (compilation) => {
            console.log("同步钩子....................");
        });
    }
}

module.exports = TextWebpackPlugin;
