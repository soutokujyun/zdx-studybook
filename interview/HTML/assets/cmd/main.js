define(function(require) {
    let { add } = require("./module2.js")
    let index = 0;
    setInterval(() => {
        document.getElementById("app").textContent = add(index)
        index++
    }, 1000);
})