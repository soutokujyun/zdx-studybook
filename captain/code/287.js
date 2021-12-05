function d(nums) {
    let p = q = 0;
    do {
        p = nums[p];
        q = nums[nums[q]];
    } while(p != q) 
    p = 0;
    while (p != q) {
        p = nums[q];
        q = nums[p];
    }

    return p;
}