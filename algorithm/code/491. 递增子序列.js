var findSubsequences = function(nums) {
    let ans = []
    let set = new Set()
    var getResult = function(start, path) {
        // 递增序列至少2个元素，重复值不添加到返回数组中
        if (path.length > 1 && !set.has(path.toString())) {
            set.add(path.toString())
            ans.push(path.slice())
        }

        for (let i = start; i < nums.length; i++) {
            if (path.length == 0 || path[path.length - 1] <= nums[i]) {
                // 将当前值放到存储数组中
                path.push(nums[i])
                // 向后遍历
                getResult(i + 1, path)
                // 删除已经遍历过的元素
                path.pop()
            }
        }
    }
    getResult(0, [])

    return ans
};