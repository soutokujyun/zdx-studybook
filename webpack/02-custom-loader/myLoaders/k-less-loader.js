// less解析成css
// 可以做，但没必要
const less = require("less");
module.exports = function (source) {
    less.render(source, (err, output) => {
        let { css } = output;
        this.callback(err, css);
    });
};
