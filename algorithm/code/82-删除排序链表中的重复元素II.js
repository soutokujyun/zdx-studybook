var deleteDuplicates = function(head) {
    if (!head) return head;
    let hair = new ListNode(-1, head), pre = hair, cur = hair.next;
    while (cur && cur.next) {
        if (pre.next.val !== cur.next.val) {
            pre = pre.next;
            cur = cur.next;
        } else {
            while(cur && cur.next && pre.next.val === cur.next.val) {
                cur = cur.next
            }
            pre.next = cur.next;
            cur = cur.next;
        }
    }
    return hair.next;
};