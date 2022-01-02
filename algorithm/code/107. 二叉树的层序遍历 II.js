var getResult = function (root, k, ans) {
    if (!root) return
    if (k == ans.length) ans.push([])
    ans[k].push(root.val)
    getResult(root.left, k + 1, ans)
    getResult(root.right, k + 1, ans)
}
var levelOrderBottom = function(root) {
    // 递归
    if (!root) return [];
    let ans = [], k = 0;
    getResult(root, k, ans)
    // 翻转成自底向上
    for (let i = 0, j = ans.length - 1; i < j; i++, j--) {
        [ans[i], ans[j]] = [ans[j], ans[i]]
    }
    return ans
};