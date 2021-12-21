var exclusiveTime = function(n, logs) {
    // 函数调用函数的独立运行时间
    let stack = [], ans = new Array(n).fill(0);
    for (let i = 0, preTime = 0; i < logs.length; i++) {
        let [id_str, status, time_str] = logs[i].split(':');
        let id = id_str - 0;
        let time = time_str - 0;
        if (status == 'start') {
            // 当前面有函数时
            if (stack.length > 0) {
                // 计算前一个函数所运行的独立时间
                ans[stack[stack.length - 1]] += time - preTime;
            }
            // 记录当前时间
            preTime = time;
            // 将当前执行的函数id压入调用栈
            stack.push(id)
        } else {
            // 计算从当前函数运行结束时间到前面记录的时间
            ans[id] += time - preTime + 1;
            // 因为有时间间隔所以要+1
            preTime = time + 1;
            // 当前函数运行结束，从调用栈中pop出去
            stack.pop()
        }
    }
    return ans;
};