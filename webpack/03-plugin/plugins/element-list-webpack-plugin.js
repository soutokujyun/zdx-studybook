const path = require('path');
const fs = require('fs');
class ElementlistWbpackPlugin {
    constructor() {
        this.material = [];
        this.date = new Date().getTime();;
    }

	apply(compiler) {

        compiler.hooks.environment.tap('查询', ()=>{
            let dir = path.resolve(__dirname, "../src/components");
            fs.readdir(dir, (err, files) => {
                if (err) return;
                console.log(files);
                files.forEach((filename) => {
                    // console.log(filename);
                    fs.readFile(dir +'/'+ filename,  (err, data) => {
                        if (err) return ;
                        let str = data.toString();
                        str = str.replace(/\s+/g, '');
                        str = str.match(/exportdefault(.*?);?<\/script>/)[1];
                        let props = eval('('+str+')').props;

                        if ( typeof props == 'Array') {
                            // 另行处理
                        } else {
                            for (const key in props) {
                                let typed = props[key].name;
                                // console.log(typed);
                                typed == undefined && (typed = props[key].type.name);

                                if (typed == 'String' || typed == 'Number') {
                                    props[key] = props[key].default !== undefined ? props[key].default : "";
                                } else if (typed == 'Object'){
                                    props[key] = props[key].default !== undefined ? props[key].default : {};
                                } else if (typed == 'Array') {
                                    props[key] = props[key].default !== undefined ? props[key].default : [];
                                } else if (typed == 'Boolean') {
                                    props[key] = props[key].default !== undefined ? props[key].default : false;
                                } else {
                                    props[key]  = "";
                                }
                            }
                        }

                        // console.log(props);
                        this.material.push({
                            type: filename.replace(/.vue/, "").toLowerCase(),
                            ...props
                        });
                    });
                });
            });
        });

		// compiler.hooks.make.tapAsync("ElementlistWbpackPlugin", (compilation, cb) => {
        //     compilation.hooks.finishModules.tap('finishModules', (modules)=>{
        //         modules.forEach(module => {
        //             if (/components/.test(module.context)) {
        //                 let filename = path.basename(module.request, '.js');
        //                 this.material.push({
        //                     type: filename.toLowerCase(),
        //                     column: []
        //                 });
        //             }
        //         });
        //     });
        //     // compilation.hooks.buildModule.tap('a', (module)=>{
        //     //     if (/components/.test(module.context)) {
        //     //         let filename = path.basename(module.request, '.js');
        //     //         this.material.push({
        //     //             type: filename.toLowerCase(),
        //     //             column: []
        //     //         });
        //     //     }
        //     // });
        //     cb();
		// });

        // compiler.hooks.normalModuleFactory.tap('MyPlugin', factory => {
        //     factory.hooks.parser.for('javascript/auto').tap('MyPlugin', (parser, options) => {
        //         parser.hooks.import.tap('export',(statement, source)=>{
        //             console.log('源码: ',source);
        //         });
        //     });
        // });
        
        // compiler.hooks.normalModuleFactory.tap('MyPlugin', factory => {
        //     factory.hooks.parser.for('javascript/auto').tap('MyPlugin', (parser, options) => {
        //         parser.hooks.import.tap('export',(statement, source)=>{
        //             console.log('源码: ',source);
        //         });
        //     });
        // });


        // compiler.hooks.emit.tapAsync("TextWebpackPlugin", (compilation, cb) => {
        //     let content = JSON.stringify(this.material);
        //     const contentSize = Buffer.byteLength(content, "utf8");
        //     compilation.assets["material.json"] = {
        //         source: function () {
        //             // 定义文件的内容
        //             return content;
        //         },
        //         size: function () {
        //             // 定义文件体积
        //             return contentSize;
        //         },
        //     };
        //     cb();
        // });
        compiler.hooks.emit.tapAsync("done234234", () => {
            console.log(new Date().getTime() - this.date);
            console.log(this.material);
        });
	}
}

module.exports = ElementlistWbpackPlugin;
