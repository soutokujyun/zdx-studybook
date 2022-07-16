(function() {
    require.config({
        baseUrl: './assets/amd',
        paths: {
            "sum": "sum",
            "utils": "utils"
        }
    });
    require(['utils'], function(utils) {
        let index = 0;
        setInterval(() => {
            document.getElementById("app").textContent = utils.accumulation(index)
            index++
        }, 1000);
    })
})()