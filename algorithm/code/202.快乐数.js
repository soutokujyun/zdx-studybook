/**
 * n = 19
 * 1^2 + 9^2 = 82
 */
function getNext(n) { // n = 19
    let s = 0; 
    while( n > 0) {
        s += ( n % 10 ) * ( n % 10 ); // 对n取余: 9^2 / 1^2
        n = Math.floor( n / 10 ); // Math.floor( 1.9 ) = 1 / Math.floor( 0.1 ) = 0
    }
    return s; // s = 9^2 + 1^2
}

function isHappy (n) {
    // 如果 n = 1 那么 n 就是快乐数
    if (n == 1 ) return true;

    // 通过模拟快慢指针的方式判断不是环形链表
    let fast = slow = n;
    do {
        fast = getNext(getNext(fast));
        slow = getNext(slow);
    } while (fast !== slow && fast !== 1) 
    /**
     * 1. 当快慢指针相等时，表示该数不是快乐数
     * 2. 当快指针走到1的位置，表示该数是快乐数
     */
    return fast == 1
}