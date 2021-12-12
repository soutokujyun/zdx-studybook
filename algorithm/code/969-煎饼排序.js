var swap = function (i, j, arr) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

var reverse = function (arr, r, ind) {
    for (let i = 0, j = r-1; i < j; i++, j--) {
        swap(i, j, arr);
        ind[arr[i]] = i;
        ind[arr[j]] = j;
    }
}

var pancakeSort = function(arr) {
    let ind = new Array(arr.length+1), ret = [];
    // 记录每个值下标
    for (let i = 0; i < arr.length; i++) ind[arr[i]] = i;
    for (let i = arr.length; i > 0; i--) {
        // i 的下标 等于 i - 1 也就是这个数字已经放到该放的位置
        if (ind[i] == i - 1) continue
        // 当 i 的小标没走到头，则进行反转
        if (ind[i] + 1 != 1) {
            ret.push( ind[i]+1 );
            reverse(arr, ind[i] + 1, ind);
        }
        // 当 i 还没走到第一项 则再次反转，将最大的值放到最后
        if (i != 1) {
            ret.push(i);
            reverse(arr, i, ind);
        }
    }
    return ret;
};