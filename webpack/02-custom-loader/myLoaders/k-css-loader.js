// 序列化css
// 可以做，但没必要
module.exports = function (source) {
    this.callback(null, JSON.stringify(source));
};
