var exchange = function(nums) {
    let x = 0, y = nums.length - 1
    do {
        while(nums[x] % 2 == 1) x++
        while(nums[y] % 2 == 0) y--
        if (x < y) {
            [nums[x], nums[y]] = [nums[y], nums[x]]
            x++, y--
        }
    } while(x <= y)

    return nums
};