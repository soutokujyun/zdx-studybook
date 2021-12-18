var inorderTraversal = function(root) {
    if (!root) return []
    // 前序遍历 左 中 右
    let res = [];
    traversal(root, res);
    return res;
};
var traversal = function (root, res) {
    if (root.left) traversal(root.left, res)
    res.push(root.val)
    if (root.right) traversal(root.right, res)
}