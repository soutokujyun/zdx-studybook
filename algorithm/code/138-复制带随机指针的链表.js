/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
 var copyRandomList = function(head) {
    let pre = head;
    // 复制节点到每个节点的后面
    while(pre) {
        pre.next = new Node(pre.val, pre.next, null);
        pre = pre.next.next;
    }
    // 7 7 13 13 11 11 10 10 0 0 null
    // 开始做random校正
    pre = head;
    while (pre) {
        pre.next.random = pre.random ? pre.random.next : null;
        pre = pre.next.next;
    }

    // 取出新的链表, 还要复原head
    pre = head;
    let newNode = cur = pre.next;
    while(pre) {
        pre.next = pre.next.next;
        cur.next = cur.next ? cur.next.next : null;
        pre = pre.next;
        cur = cur.next;
    }

    return newNode;
};