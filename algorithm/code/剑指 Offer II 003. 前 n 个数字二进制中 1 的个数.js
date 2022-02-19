var countBits = function(n) {
    let bit2 = new Array(n + 1).fill(0)
    for (let i = 1; i <= n; i++) {
        let x = i;
        do {
            if (x & 1) {
                bit2[i]++
            }
            x = x >> 1;
        } while (x)
        
    }

    return bit2
};