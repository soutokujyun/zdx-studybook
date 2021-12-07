var deleteDuplicates = function(head) {
    if (!head) return head;
    let pre = head, cur = head.next;
    while (cur) {
        if (pre.val != cur.val) {
            pre.next = cur;
            pre = cur;
            cur = cur.next;
        } else {
            cur = cur.next;
        }
    }
    pre.next = null;
    
    return head;
};