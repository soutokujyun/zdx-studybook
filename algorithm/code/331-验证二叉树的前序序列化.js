var isValidSerialization = function(preorder) {
    let stack = [1];
    let arr = preorder.split(',');
    for (let i = 0; i < arr.length; i++) {
        // 如果中间有槽位不够情况，则表示二叉树不正确
        if (!stack.length) return false
        // 不管是否为空节点都会先占用一个槽位
        stack[stack.length-1]--
        // 如果槽位占满，则移除当前位置
        if (stack[stack.length - 1] == 0) stack.pop()
        if (arr[i] !== '#') {
            // 非空节点添加2个槽位
            stack.push(2)
        }
    }

    return !stack.length
};

var isValidSerialization1 = function(preorder) {
    let arr = preorder.split(',')
    let diff = 1; // 根节点没有入度
    for (let i = 0; i < arr.length; i++) {
        // 节点入度为1
        diff--
        if (diff < 0) return false
        if (arr[i] !== '#') {
            // 非空节点出度为2
            diff += 2
        }
    }
    return diff == 0;
};