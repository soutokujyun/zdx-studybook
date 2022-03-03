var removeCoveredIntervals = function(intervals) {
    // 首先特判
    if (intervals.length < 2) return intervals.length
    // 将区间按区间起始位置升序排序，如果相等则按区间结束位置降序排序
    // 因为需要判断当前区间是不是被前面的区间包含
    intervals.sort((a, b) => {
        if (a[0] == b[0]) return b[1] - a[1]
        return a[0] - b[0]
    })

    let ans = []
    ans.push(intervals[0])
    for (let i = 1; i < intervals.length; i++) {
        // 如果当前区间不被前面区间包含，则不需要删除当前区间，否则删除当前区间
        if (intervals[i][0] < ans[ans.length - 1][0] || intervals[i][1] > ans[ans.length - 1][1]) {
            ans.push(intervals[i])
        }
    }
    return ans.length
};