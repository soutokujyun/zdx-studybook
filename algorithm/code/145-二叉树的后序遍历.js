var postorderTraversal = function(root) {
    // 递归
    if (!root) return []
    // 前序遍历 左 右 中
    let res = [];
    traversal(root, res);
    return res;
};

var traversal = function (root, res) {
    if (root.left) traversal(root.left, res)
    if (root.right) traversal(root.right, res)
    res.push(root.val)
}


var postorderTraversal1 = function(root) {
    // 迭代
    if (!root) return []
    let res = [], stack = [root];
    while (stack.length) {
        let root = stack.pop()
        res.unshift(root.val)
        if (root.left) stack.push(root.left)
        if (root.right) stack.push(root.right)
    }
    return res;
};