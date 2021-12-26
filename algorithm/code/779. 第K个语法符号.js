var kthGrammar = function(n, k) {
    if (n == 1) return 0
    if (n == 2) {
        if (k % 2 === 0) {
            return 1
        } else {
            return 0
        }
    }
    if (k % 2 == 0) {
        return kthGrammar(n - 1, k / 2) === 0 ? 1 : 0
    } else {
        return kthGrammar(n - 1, Math.floor(k / 2) + 1)
    }
};