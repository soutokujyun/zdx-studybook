var dfs = function(l, r) {
    let ans = []
    if (l > r) {
        ans.push(null);
        return ans;
    }       
    for (let i = l; i <= r; i++) { // [1, 2] 为例 2 为根节点
        // i 为当前树的根节点
        // 那么左边的树就是的取值范围就是 [l, i - 1]
        let leftNodes = dfs(l, i - 1); // dfs(1， 1) {1, null, null}
        // 右边的树就是的取值范围就是 [i + 1, r]
        let rightNodes = dfs(i + 1, r) // dfs(3, 2) null
        // 左右子树的排列组合
        for (let leftN of leftNodes) {
            for (let rightN of rightNodes) {
                let t = new TreeNode(i, leftN, rightN) // TreeNode(2, 1, null)
                ans.push(t)
            }
        }
    }
    return ans
}
var generateTrees = function(n) {
    let ans = []
    if (n == 0) return ans
    return dfs(1, n)
};