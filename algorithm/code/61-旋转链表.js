var rotateRight = function(head, k) {
    if (!head) return head;
    let pre = tail = head, cnt = 1;
    while (pre.next) {
        pre = pre.next;
        cnt++;
    }
    // 做成环形链表
    pre.next = head;
    // 确定往后查找的位置
    cnt = cnt - k % cnt;
    while (--cnt) {
        tail = tail.next;
    }
    pre = tail.next;
    // 将尾节点指向空，形成非环形链表
    tail.next = null;
    return pre;
};