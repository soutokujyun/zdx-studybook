/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 示例：3->2->0->4
 *         ^      |
 *         |------|
 */
function hasCycle (head) {
    // 如果头指针指向null，肯定不是环形链表
    if (!head) return false;

    // 设快慢指针
    let fast = slow = head;
    // 如果fast为null或指向null，说明走到链表尾了
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        // 如果相遇则，证明链表是环形链表
        if (fast === slow) return true;
    }

    return false
}