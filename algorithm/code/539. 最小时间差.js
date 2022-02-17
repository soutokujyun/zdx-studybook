var fnc = function(str) {
    return Number(str[0]) * 10 * 60 + Number(str[1]) * 60 + Number(str[3]) * 10 + Number(str[4])
}
var findMinDifference = function(timePoints) {
    timePoints = timePoints.sort()

    let ans = fnc(timePoints[0]) + 24 * 60 - fnc(timePoints[timePoints.length-1])
    for (let i = 1; i < timePoints.length; i++) {
        ans = Math.min(ans, fnc(timePoints[i]) - fnc(timePoints[i - 1]))
    }

    return ans
};