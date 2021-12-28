var buildTree = function(preorder, inorder) {
    // 当前节点不存在时，返回空
    if (!preorder.length) return null
    // 找中序遍历根节点的位置
    let pos = 0;
    while(preorder[0] !== inorder[pos]) pos++
    // 创建树
    let root = new TreeNode(preorder[0])
    // 设置树的左右两个节点
    root.left = buildTree(preorder.slice(1, pos+1), inorder.slice(0, pos))
    root.right = buildTree(preorder.slice(pos+1, preorder.length), inorder.slice(pos+1, preorder.length))
    return root
};