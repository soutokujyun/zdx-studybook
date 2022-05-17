// 自定义loader
// loader 就是一个函数，不可以是箭头函数，因为参数都执行this
// loader 必须要有返回值
// loader通过this.query接收参数
// loader api 都挂载this对象
// 返回多种信息   this.callback
// 处理异步逻辑   this.async
// 多个自定义loader处理
// 处理自定义loader的路劲问题
module.exports = function (source) {
    console.log(this.query, source);
    const content = source.replace("hello", this.query.name);

    // 异步逻辑处理
    const callback = this.async();
    setTimeout(() => {
        const content = source.replace("hello", this.query.name);
        callback(null, content);
    }, 3000);

    // this.callback(null, content);
    // return source.replace("hello", this.query.name);
};
