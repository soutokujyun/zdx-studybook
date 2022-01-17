var maximumScore = function(a, b, c) {
    [a, b, c] = [a, b, c].sort((a, b) => a - b)
    if (a + b <= c) {
        return a + b
    } else {
        return (a + b + c) / 2 | 0
    }
};