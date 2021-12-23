var getKthFromEnd = function(head, k) {
    let pre = head, cur = head;
    while(k--) {
        cur = cur.next;
    }

    while(cur) {
        cur = cur.next;
        pre = pre.next;
    }

    return pre
};