var singleNumbers = function(nums) {
    let t = 0
    for (const x of nums) {
        t ^= x;
    }
    let ind = 0;
    while((t & (1 << ind)) == 0) {
        ind++
    }
    let a = 0; b = 0;
    for (const x of nums) {
        if ((x & (1 << ind)) == 0) {
            a ^= x
        } else {
            b ^= x;
        }
    }
    return [a, b]
};