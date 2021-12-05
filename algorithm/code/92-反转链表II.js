var reverse = function (head, cnt) {
    let pre = null, cur = head;
    while (cnt--) {
        let next = cur.next; 
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    head.next = cur;
    return pre;
}
var reverseBetween = function(head, left, right) {
    if (!head && left == right) return head;
    let hair = new ListNode(-1, head), pre = hair, cnt = right - left + 1;

    while (--left) {
        pre = pre.next;
    }

    pre.next = reverse(pre.next, cnt);

    return pre;
};