/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
 var splitListToParts = function(head, k) {
    let len = 0, pre = head, result = [];
    // 计算链表长度
    while(pre) {
        pre = pre.next;
        len++
    }
    // 计算每个连续部分要存放几个节点
    const itemLen = Math.floor(len / k)
    // 计算剩余节点
    let carry = len % k
    let hair = new ListNode(-1, head) 
    while (k--) {
        let n = itemLen, pre = hair
        while(n--) {
            pre = pre.next
        }
        // 如果有剩余节点，就补充一位
        if (carry-- > 0 && pre) pre = pre.next
        result.push(hair.next || null)
        let next = pre.next || null
        pre.next = null
        hair.next = next
    }
    return result
};