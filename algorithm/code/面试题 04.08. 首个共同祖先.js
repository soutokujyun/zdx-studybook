var lowestCommonAncestor = function(root, p, q) {
    if (!root) return root
    // 注意：p 和 q 是节点，不是数字
    if (p == root || q == root) return root

    let lNode = lowestCommonAncestor(root.left, p, q)
    let rNode = lowestCommonAncestor(root.right, p, q)

    if (lNode && rNode) return root
    if (lNode) return lNode
    return rNode
};