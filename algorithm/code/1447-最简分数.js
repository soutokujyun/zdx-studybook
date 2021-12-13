var gcd = function(a, b) {
    if (b) return gcd(b, a % b)
    return a;
}
var simplifiedFractions = function(n) {
    if (n == 1) return [];
    let result = [];
    // 分子
    for (let i = 1; i < n; i++) {
        for (let j = i + 1; j <= n; j++) {
            if (gcd(i,j) !== 1) continue;
            result.push(i + '/' + j);
        }
    }
    return result;
};