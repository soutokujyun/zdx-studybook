var calPoints = function(ops) {
    let num = [];
    for (let i = 0; i < ops.length; i++) {
        switch(ops[i]) {
            case '+':
                num.push(num[num.length - 1] + num[num.length - 2]);
                break;
            case "D": 
                num.push(num[num.length - 1] * 2)
                break;
            case "C": 
                num.pop();
                break;
            default:
                num.push(Number(ops[i]));
        }
    }
    return num.reduce((a, b) => a + b);
};