输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

B是A的子结构， 即 A中有出现和B相同的结构和节点值。

例如:
给定的树 A:
```
     3
    / \
   4   5
  / \
 1   2
给定的树 B：

   4 
  /
 1
```
返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。

### 解题思路
这一题 需要同时遍历 A B 两颗树。
1. 判断 A B 两颗树都不为空
2. 判断A的根节点是否等于B的根节点
    1. 相等时，判断A的左右节点和B的左右节点是否相等
    2. 不相等时，将A的左右节点和B做判断
3. 重复上述的过程

### 代码
```
var isSubStructure = function(A, B) {
    return (!!A && !!B) && (recru(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)) 
};

var recru = function(A, B) {
    if (!B) return true
    if (!A && A.val !== B.val) return false
    return recru(A.left, B.left) && recru(A.right, B.right)
}
```