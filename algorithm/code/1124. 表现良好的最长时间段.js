var longestWPI = function(hours) {
    // 计算前缀和
    let preSum = new Array(hours.length + 1).fill(0);
    for (let i = 0; i < hours.length; i++) {
        if (hours[i] > 8) preSum[i + 1] = preSum[i] + 1;
        else preSum[i + 1] = preSum[i] - 1
    }
    // 记录最小的前缀和下标
    let stack = [0];
    for (let i = 0; i < preSum.length; i++) {
        if (preSum[i] < preSum[stack[stack.length - 1]]) stack.push(i)
    }
    console.log(stack)
    console.log(preSum)
    // 求最大值
    let max = 0
    // 0, 1, 2, 1, 0, -1, -2, -1
    for (let i = preSum.length - 1; i > max; i--) {
        while (stack.length && preSum[stack[stack.length-1]] < preSum[i]) {
            max = Math.max(max, i - stack.pop())
        }
    }
    return max
};