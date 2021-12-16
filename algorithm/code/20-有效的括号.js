var isValid = function(s) {
    let stack = [];
    let map = new Map([
        [')', '('],
        ['}', '{'],
        [']', '[']
    ]
    )
    for (k of s) {
        if (map.has(k)) {
            if (stack[stack.length-1] !== map.get(k)) return false
            stack.pop();
        } else {
            stack.push(k)
        }
    }
    return !stack.length;
};