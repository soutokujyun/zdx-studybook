var detectCycle = function(head) {
    if (!head) return null;

    let fast = slow = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;

        // 找到相遇点
        if (fast == slow) {
            let pre = head
            // 找到入口起点位置
            while (pre !== slow) {
                pre = pre.next;
                slow = slow.next;
            }
            return pre;
        }
    }
    // 不是环形链表
    return null
};