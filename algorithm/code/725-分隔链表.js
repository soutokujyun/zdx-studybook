var splitListToParts = function(head, k) {
    let len = 0, pre = head, result = []; 
    // 计算链表长度
    while(pre) {
        pre = pre.next;
        len++
    }
    // 计算每个分隔链表长度
    let itemLen = Math.floor(len / k);
    // 计算剩余未分配的节点个数
    let carry = len % k;
    // 设置虚拟头节点，因为要操作头节点
    let hair = new ListNode(-1, head);
    for (let i = 0; i < k; i++) {
        let pre = hair, num = itemLen;
        while(num--) {
            pre = pre.next;
        }
        if (carry-- > 0 && pre) pre = pre.next;
        result.push(hair.next || null);
        let next = pre.next || null;
        pre.next = null;
        hair.next = next;
    }
    return result;
};