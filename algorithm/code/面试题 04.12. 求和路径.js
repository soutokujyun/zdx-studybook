var dfs = function(root, sum) {
    if (!root) return 0
    let val = sum - root.val
    return (root.val == sum) + dfs(root.left, val) + dfs(root.right, val) 
}
var pathSum = function(root, sum) {
    if (!root) return 0
    return dfs(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum)
};