var sortList = function(head) {
    if (head == null) return head
    let l = head.val, r = head.val, mid
    let p = head, q, h1 = null, h2 = null
    // 首先获取最大值和最小值，来取 mid 基准值
    while(p) {
        l = Math.min(l, p.val)
        r = Math.max(r, p.val)
        p = p.next
    }
    if (l == r) return head
    mid = (l + r) >> 1
    p = head
    // 遍历链表
    while (p) {
        q = p.next
        // 将小于等于基准值的节点放到h1链表
        if (p.val <= mid) {
            p.next = h1
            h1 = p
        } else { // 将大于基准值的节点放到h2链表
            p.next = h2
            h2 = p
        }
        p = q
    }
    // 循环上述步骤
    h1 = sortList(h1)
    h2 = sortList(h2)
    // 将h1链表与h2链表合并
    p = h1
    while(p.next) p = p.next
    p.next = h2
    return h1
};