define(function(require, exports, module) {
    let { num } = require("./module1.js")
    console.log(num)
    function add(x) {
        return x + num
    }
    module.exports = {
        add
    }
})