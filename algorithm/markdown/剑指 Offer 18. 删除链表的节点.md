给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

### 解题思路
这一题利用前后两个双指针来处理
1. 因为要操作头节点，所以设置虚拟头节点
2. 设cur指向头节点，pre指向虚拟头节点
3. 遍历链表匹配cur.val等于val值
4. 然后通过pre指向当前节点的下一个节点

### 代码
```
var deleteNode = function(head, val) {
    let hair = new ListNode(-1, head), pre = hair, cur = head
    while(cur) {
        if (cur.val == val) {
            break
        }
        pre = pre.next;
        cur = cur.next;
    }
    pre.next = cur.next

    return hair.next
};
```