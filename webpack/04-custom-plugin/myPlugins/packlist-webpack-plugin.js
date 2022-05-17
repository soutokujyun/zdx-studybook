class PacklistWbpackPlugin {
    constructor() {
        console.log("做人嘛，最重要的是开心。");
    }
    apply(compiler) {
        compiler.hooks.emit.tapAsync("TextWebpackPlugin", (compilation, cb) => {
            // 文件数量
            let i = 0;
            // 内容
            let content = "";
            Object.keys(compilation.assets).forEach((filename) => {
                content += `--->${filename}\n`;
                i++;
            });
            content = `文件数量为：${i}\n` + content;
            const contentSize = Buffer.byteLength(content, "utf8");
            compilation.assets["fileList.txt"] = {
                source: function () {
                    // 定义文件的内容
                    return content;
                },
                size: function () {
                    // 定义文件体积
                    return contentSize;
                },
            };
            cb();
        });
    }
}

module.exports = PacklistWbpackPlugin;
