var widthOfBinaryTree = function(root) {
    if (!root) return 0
    // 1n表示大整数
    let maxWidth = 1, queue = [[1n, root]]
    while(queue.length) {
        // 取当前层编号最大值和最小值计算宽度
        let width = queue[queue.length - 1][0] - queue[0][0] + 1n
        if (width > maxWidth) maxWidth = width
        let temp = []
        // 遍历二叉树下一层
        for (const [i, r] of queue) {
            r.left && temp.push([i * 2n, r.left])
            r.right && temp.push([i * 2n + 1n, r.right])
        }
        queue = temp
    }
    return Number(maxWidth)
};