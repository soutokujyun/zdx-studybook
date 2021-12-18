var preorderTraversal = function(root) {
    if (!root) return []
    // 前序遍历 中 左 右
    let res = [];
    traversal(root, res);
    return res;
};

var traversal = function(root, res) {
    res.push(root.val)
    if (root.left) traversal(root.left, res)
    if (root.right) traversal(root.right, res)
}