var singleNumber = function(nums) {
    let bit2 = new Array(32).fill(0)
    for (let x of nums) {
        for (let i = 0; x; i++) {
            if (x & 1) {
                bit2[i]++
            }
            x = x >> 1;
        }
    }
    let ans = 0;
    for (let i = 0; i < 32; i++) {
        if (bit2[i] % 3) {
            ans += 1 << i;
        }
    }
    return ans;
};