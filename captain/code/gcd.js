// 欧几里得算法 求最大公约数 gcd(a, b)

// 辗转相除法，求最大公约数
// a > b 缩小问题规模的作用
// a < b 交换a,b位置的作用
function gcd(a, b) {
    if (b) return gcd(b, a % b);
    return a;
}

var  a = gcd(6, 4);

console.log(a);

// 证明1: b和a%b的最大公约数，是a,b的公约数
/**
 * 设b, a%b最大公约数c
 * b = k1 * c
 * a%b = k2 * c
 * a-kb = k2*c
 * a = k2*c+k*b
 * a = k2*c+kk1*c
 * 得：
 * a = (k2 + kk1)·c
 * b = k1·c
 */

// 证明2: b和a%b的最大公约数也是a,b的最大公约数
/**
 * 反证法：
 * a = (x + ky) c
 * b = y c
 * gcd(x+y·k, y) = d | d <> 1
 * 
 * x + ky = nd
 * y = md
 * x = nd - ky = nd - mdk = (n - mk) d
 * 得：
 * b = y c
 * a % b = x c
 * b = m d
 * a % b = (n - mk) d
 */


// 扩展欧几里得算法
/**
 * 贝祖等式
 * ax + by = gcd(a,b) = c 保证 ax + by = c  一定有解
 * 先递归到最后一层，往前回溯获取上一层的解，一直递归知道获取到解
 * y, x-ky <- x, y <- 1,0
 */
function ex_gcd(a, b, x, y) {
    if(b == 0) {
        x = 1, y = 0;
        return a;
    }

    let r = ex_gcd(b, a % b, y, x);
    y -= a / b * x;
    return r;
}

let x, y;
console.log(ex_gcd(3, 5, x, y), x ,y);

function phi(n) {
    let x = 2, ans = n;
    while (n * x <= n) {
        if ( n % x == 0) ans -= ans / x;
        while (n % x == 0) n = n / x;
        x+=1
    }
    if (n != 1) ans -= ans / n;
    return ans;
}

console.log(phi(12));