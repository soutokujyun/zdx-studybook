var evalRPN = function(tokens) {
    let stack = []
    for (const token of tokens) {
        // 运算符
        if (isNaN(token)) {
            let num1 = stack.pop()
            let num2 = stack.pop()
            switch(token) {
                case '+': stack.push(num2 + num1); break;
                case '-': stack.push(num2 - num1); break;
                case '*': stack.push(num2 * num1); break;
                case '/': stack.push(num2 / num1 | 0); break;
            }
        } else {
            stack.push(Number(token))
        }
    }

    return stack[0]
};