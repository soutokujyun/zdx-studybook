var merge = function(intervals) {
    // 首先来个特判断
    if (intervals.length < 2) return intervals
    // 将数组按区间start升序排序
    intervals.sort((a, b) => a[0] - b[0])
    let ans = []
    ans.push(intervals[0])
    for (let i = 1; i < intervals.length; i++) {
        // 当前区间与前面的区间不重叠，也就是 end(i - 1) < start(i) ,区间不合并
        if (ans[ans.length - 1][1] < intervals[i][0]) {
            ans.push(intervals[i])
        } else { // 当前区间与前面区间重叠，需要区间合并
            // 当前区间是前面区间的子区间时，不需要合并
            if (ans[ans.length - 1][1] < intervals[i][1]) ans[ans.length - 1][1] = intervals[i][1] 
        }
    }
    return ans
};