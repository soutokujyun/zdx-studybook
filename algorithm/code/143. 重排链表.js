var reorderList = function(head) {
    let right = left = head;
    while(right && right.next) {
        left = left.next;
        right = right.next.next;
    }
    
    right = reverse(left.next);
    left.next = null;
    left = head;
    while (right) {
        let lnext = left.next;
        let rnext = right.next;
        left.next = right;
        right.next = lnext;
        left = lnext;
        right = rnext;
    }

    return head;
};

var reverse = function(head) {
    let pre = null, cur = head;
    while (cur) {
        [cur.next, pre, cur] = [pre, cur, cur.next]
    }
    return pre;
}