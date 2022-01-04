var getDp = function (root) {
    let dp = [[10000, 10000], [10000, 10000]]
    // 处理空节点
    if (!root) {
        dp[0][0] = 0
        dp[1][0] = 0
        dp[0][1] = 10000 // 空节点：本节点放置是不行的
        dp[1][1] = 10000 // 空节点：本节点放置是不行的
        return dp
    }
    // 处理叶子节点
    if (!root.left && !root.right) {
        dp[0][0] = 10000 // 当前节点不放置，父节点也不放置，当前节点就无法覆盖，出错
        dp[1][0] = 0
        dp[0][1] = 1
        dp[1][1] = 1
        return dp
    }
    // 处理其他节点
    let l = getDp(root.left)
    let r = getDp(root.right)
    dp[0][0] = Math.min(Math.min(l[0][1] + r[0][0], l[0][0] + r[0][1]), l[0][1] + r[0][1])
    dp[1][0] = Math.min(dp[0][0], l[0][0] + r[0][0])
    dp[0][1] = Math.min(Math.min(l[1][0] + r[1][0], l[1][1] + r[1][1]), Math.min(l[1][1] + r[1][0], l[1][0] + r[1][1])) + 1
    dp[1][1] = dp[0][1]
    return dp
}
var minCameraCover = function(root) {
    let dp = getDp(root)
    return Math.min(dp[0][0], dp[0][1])
};