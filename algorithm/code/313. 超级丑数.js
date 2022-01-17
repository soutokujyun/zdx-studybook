var nthSuperUglyNumber = function(n, primes) {
    let res = [1];
    // 记录每个指针的位置
    let points = new Array(primes.length).fill(0)

    let map, min
    for (let i = 1; i <= n; i++) {
        map = primes.map((prime, index) => res[points[index]] * prime)
        // 取最小值
        min = Math.min.apply(null, map)
        // 判断质因数
        primes.forEach((prime, index) => {
            // map[index] === res[points[index]] * prime
            if (map[index] == min) points[index]++
        })
        res.push(min)
    }

    return res[n - 1]
};