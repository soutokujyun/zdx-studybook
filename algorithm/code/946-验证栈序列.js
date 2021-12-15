var validateStackSequences = function(pushed, popped) {
    let stack = [], index = 0;
    for (let num of pushed) {
        stack.push(num)
        while(stack[stack.length - 1] === popped[index] && stack.length) {
            stack.pop()
            index++
        }
    }
    return !stack.length
};