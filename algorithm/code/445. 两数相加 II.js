var addTwoNumbers = function(l1, l2) {
    let pre1 = reverse(l1);
    let pre2 = reverse(l2);
    let cur = null;
    let carry = 0;
    while (pre1 || pre2) {
        let sum = Number(pre1 ? pre1.val : 0) + Number(pre2 ? pre2.val : 0) + carry;
        carry = Math.floor(sum / 10);
        sum = sum % 10;
        cur = new ListNode(sum, cur)
        pre1 = pre1 ? pre1.next : null;
        pre2 = pre2 ? pre2.next : null;
    }
    
    if (carry) cur = new ListNode(carry, cur);

    return cur
};

var reverse = function (head) {
    let pre = null, cur = head;
    while (cur) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}