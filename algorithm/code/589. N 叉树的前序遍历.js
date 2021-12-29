// 递归
var preorder = function(root) {
    let nes = []
    var dfs = function(root) {
        if (!root) return 
        nes.push(root.val)
        for (child of root.children) {
            dfs(child)
        }
    }
    dfs(root)
    return nes;
};

// 迭代
var preorder1 = function(root) {
    let nes = []
    let stack = [root]
    while (stack.length) {
        let root = stack.pop()
        nes.push(root.val)
        // 因为输出是中左右，左边子树比右边子树早输出，又因为存入的是栈，后进先出，所以子树第一个节点应该放到栈的末尾
        for(let i = root.children.length - 1; i >= 0; i--) {
            stack.push(root.children[i])
        }
    }
    return nes;
};