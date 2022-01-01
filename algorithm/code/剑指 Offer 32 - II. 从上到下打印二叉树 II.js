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