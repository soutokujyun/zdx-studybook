// 递归
var fib = function(n) {
    if (n == 0) return 0
    if (n == 1) return 1
    return fib(n - 1) + fib(n - 2)
};

// 迭代
var fib1 = function(n) {
    if (n == 0 || n == 1) return n
    let n0 = 0, n1 = 1, fn = 0;
    for (let i = 2; i <= n; i++) {
        fn = n0 + n1
        n0 = n1
        n1 = fn
    }
    return fn
}