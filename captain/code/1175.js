// 素数筛选算法
function count_prime(n) {
    let prime = new Array(n+1);
    
}

function a(n) {
    let m = count_prime(n), mode_num = 1e9+7;
    return frac(m, mode_num) * frac(n-m, mode_num) %mode_num
}