var leastInterval = function(tasks, n) {
    if (n == 0) return tasks.length;

    const freq = _.countBy(tasks);
    const MAX_VAL = Math.max(...Object.values(freq));
    let carry = 0;
    Object.values(freq).forEach(val => {
        if (MAX_VAL == val) carry++;
    });

    return Math.max(tasks.length, (MAX_VAL - 1) * (n + 1) + carry);
};