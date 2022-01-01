从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

例如:
给定二叉树: [3,9,20,null,null,15,7],
```
    3
   / \
  9  20
    /  \
   15   7
```
返回其层次遍历结果：
```
[
  [3],
  [9,20],
  [15,7]
]
```

### 解题思路
这题可以使用迭代的方式做，先把每层的节点都编号，如第一层是0、第二层是1、第三层是3
然后将层序遍历每层节点，将非空节点放入到数组中。

### 代码
```
var levelOrder = function(root) {
    if (!root) return []
    let stack = [[0, root]], ans = []
    while (stack.length) {
        let [index, root] = stack.pop()
        if (ans.length == index) ans.push([])
        ans[index].push(root.val)
        root.right && stack.push([index+1, root.right])
        root.left && stack.push([index+1, root.left])
    }

    return ans
};
```