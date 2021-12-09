/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
 var buddyStrings = function(s, goal) {
    if (s.length !== goal.length) return false;
    
    // 如果 ab 相等
    if (s == goal) {
        // 判断a是否有重复字符
        let cnt = new Array(26).fill(0);
        for (let i = 0; i < s.length; i++) {
            cnt[s[i].charCodeAt() - 97] += 1;
            if (cnt[s[i].charCodeAt() - 97] == 2) return true;
        }
        return false;
    }

    // 分段处理 [abab]c[abab]d[abab] 交换c d
    let i = 0, j;
    // 前段 检索第一个不相等的下标
    while (s[i] == goal[i]) i++;

    // 中间段 检索第二个不相等的下标
    j = i + 1;
    while (j < s.length && s[j] == goal[j]) j++
    // 如果走到末尾未找到第二个不相等
    if (j == s.length) return false;
    // 判断交换字符是否相等
    if (s[i] != goal[j] || s[j] != goal[i]) return false;
    // 后端 查看后面的字符是否完全相等
    j++
    while (j < s.length) {
        if (s[j] != goal[j]) return false
        j++
    }
    return true;

    
};
