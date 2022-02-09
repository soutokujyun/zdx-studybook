var maxSlidingWindow = function(nums, k) {
    let ans = [];
    if (k == 1) return nums
    let queue = [];
    for (let i = 0; i < nums.length; i++) {
        // 升序排序
        while(queue.length > 0 && nums[queue[queue.length - 1]] < nums[i]) queue.pop()
        queue.push(i)
        // 当第一个数在窗口之外移除
        if (i - queue[0] > k) queue.shift()
        if (i + 1 < k) continue
        ans.push(nums[queue[0]])
    }
    return ans
};


let nums = [1,3,-1,-3,5,3,6,7]
let k = 3

let data = maxSlidingWindow(nums, k)
console.log(data)