var swapPairs = function(head) {
    if (!head) return head;
    let hair = new ListNode(-1, head), temp = hair;

    // 当头指针的下一个或下下个节点为空时，链表翻转操作结束；
    while (temp.next && temp.next.next) {
        let pre = temp.next, cur = temp.next.next;
        // 1. pre指向cur的下一个节点;
        pre.next = cur.next;
        // 2. cur指向pre;
        cur.next = pre;
        // 3. temp指向cur;
        temp.next = cur;
        // 4. temp 走到 pre的位置作为一个交换的头指针
        temp = pre;
    }
    return hair.next;
};