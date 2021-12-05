var reverseList = function(head) {
    if (!head) return head;

    let pre = null, cur = head;
    // 检查cur结点是否为链表末尾 NULL ，如果是，则链表反转结束
    while (cur) {
        // 通过next保留下一个待反转的节点 也就是 cur.next
        let next = cur.next;
        // 开始反转操作，让cur指向pre
        cur.next = pre;
        // 反转完成 pre 走到 cur 的位置， cur 走到 next 的位置
        pre = cur;
        cur = next;
    }

    return pre;
};