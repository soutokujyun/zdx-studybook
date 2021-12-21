var calculate = function(s) {
    let stack = [];
    let sign = '+';
    for(let i = 0, num = 0; i < s.length; i++) {
        // 处理数字
        if (!isNaN(s[i]) && s[i] !== ' ') {
            num = num * 10 + (s[i] - 0)
        }
        // 处理运算符 或者 当前位置是运算数最后一个数
        if (isNaN(s[i]) || i == s.length - 1) {    
            switch(sign) {
                case '+' : stack.push(num);break;
                case '-' : stack.push(-num);break;
                case '*' : stack.push(stack.pop() * num);break;
                case '/' : stack.push(stack.pop() / num | 0);break;
            }
            num = 0;
            sign = s[i];
        }
    }
    
    let nes = 0;
    while(stack.length) {
        nes += stack.pop();
    }
    return nes;
};