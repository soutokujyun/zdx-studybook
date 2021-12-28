var kthLargest = function(root, k) {
    let target = 0;
    var dfs = function(root) {
        if (!root) return
        dfs(root.right)
        if (!--k) target = root.val
        dfs(root.left)
    }
    dfs(root)
    return target
};