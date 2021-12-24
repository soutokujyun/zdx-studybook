var detectCycle = function(head) {
    let fast = slow = head;
    while (fast) {
        (fast = fast.next) && (fast = fast.next);
        slow = slow.next;
        if (slow === fast) break;
    }

    if (!fast) return null;
    let pre = head;
    while (pre !== slow) {
        pre = pre.next;
        slow = slow.next;
    }
    return pre;
};