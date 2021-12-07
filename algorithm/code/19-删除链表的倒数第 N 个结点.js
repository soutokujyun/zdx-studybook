var removeNthFromEnd = function(head, n) {
    if (!head) return head;
    let hair = new ListNode(-1, head), pre = hair, cur = head;
    while(n--) {
        cur = cur.next;
    }
    while(cur) {
        pre = pre.next;
        cur = cur.next;
    }
    pre.next = pre.next.next;

    return hair.next;
};