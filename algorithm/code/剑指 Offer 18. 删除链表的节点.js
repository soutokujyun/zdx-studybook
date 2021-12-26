var deleteNode = function(head, val) {
    let hair = new ListNode(-1, head), pre = hair, cur = head
    while(cur) {
        if (cur.val == val) {
            break
        }
        pre = pre.next;
        cur = cur.next;
    }
    pre.next = cur.next

    return hair.next
};