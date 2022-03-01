var dfs = function(root, depth, arr) {
    if (!root) return
    if (arr[depth] == undefined) {
        arr[depth] = 0
    } 
    arr[depth] += root.val
    dfs(root.left, depth + 1, arr)
    dfs(root.right, depth + 1, arr)
}
var deepestLeavesSum = function(root) {
    let arr = [0]
    dfs(root, 0, arr)
    return arr[arr.length - 1]
};