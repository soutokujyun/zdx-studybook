
let num = 0
// let t = setInterval(() => {
//     console.log(num++)
//     if (num > 10) clearInterval(t)
// }, 1000)

function setIntervalSample(fn, t) {
    let timer = null;
    function interval() {
        fn()
        timer = setTimeout(interval, t)
    }
    interval()

    return () => {
        clearTimeout(timer)
    }
}

let t = setIntervalSample(() => {
    console.log(num++)
    if (num > 5) t()
}, 1000)

// t()