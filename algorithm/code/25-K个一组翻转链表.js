var reverse = function (head, k) {
    let pre = head, cur = head, cnt = k;
    while (--k && pre) {
        pre = pre.next;
    }
    if (!pre) return head;
    pre = null;
    while(cnt--) {
        // let next = cur.next;
        // cur.next = pre;
        // pre = cur;
        // cur = next;
        [cur.next, pre, cur] = [pre, cur, cur.next];
    }
    head.next = cur;
    return pre;
}
var reverseKGroup = function(head, k) {
    if (!head || k < 2) return head;
    let hair = new ListNode(-1, head), pre = hair;
    while (1) {
        pre.next = reverse(pre.next, k);
        for (let i = 0; i < k && pre; i++) {
            pre = pre.next
        }
        if (!pre) break;
    }

    return hair.next;
};