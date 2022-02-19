var maxProduct = function(words) {
    let n = words.length;
    let bit2 = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        for (let c of words[i]) {
            bit2[i] = bit2[i] | (1 << (c.charCodeAt() - 97))
        }
    }
    let ans = 0
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if ((bit2[i] & bit2[j]) == 0) {
                ans = Math.max(ans, words[i].length * words[j].length)
            }
        }
    }
    return ans
};