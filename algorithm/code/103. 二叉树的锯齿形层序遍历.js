var zigzagLevelOrder = function(root) {
    // 迭代
    if (!root) return []
    let stack = [[0, root]], ans = []
    while(stack.length) {
        let [index, root] = stack.pop()
        if (ans.length == index) ans.push([])
        if (index % 2) {
            ans[index].push(root.val)
        } else {
            ans[index].unshift(root.val)
        }
        root.left && stack.push([index+1, root.left])
        root.right && stack.push([index+1, root.right])
    }
    return ans
};