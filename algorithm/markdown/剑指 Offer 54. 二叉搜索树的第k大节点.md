给定一棵二叉搜索树，请找出其中第 k 大的节点的值。

### 解题思路
二叉搜索树的性质是左子树的值都要小于根节点，右子树的值都要大于根节点
所以二叉搜索树的中序遍历是一个有序序列（单调递增序列）

因为二叉搜索的中序遍历是一个单调递增序列，那么根据题意，我们需要获取 第 k 大的节点，
那么我们可以反向中序遍历，让序列变成一个单调递减的序列

### 代码
```
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
```