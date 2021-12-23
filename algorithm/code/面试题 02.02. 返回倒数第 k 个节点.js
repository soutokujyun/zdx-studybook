var kthToLast = function(head, k) {
    let cur = head, pre = head;
    while (k--) {
        cur = cur.next;
    }
    
    while (cur) {
        cur = cur.next;
        pre = pre.next;
    }

    return pre.val;
};