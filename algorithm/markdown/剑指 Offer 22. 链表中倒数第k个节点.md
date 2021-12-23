输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。

### 解题思路
这一题可以利用双指针来做。
1. 设pre和cur两个指针指向头节点
2. 先让cur走k步
3. 然后pre随着cur开始走，知道cur指向null为止
4. 然后返回当前pre的链表

```
1 -> 2 -> 3 -> 4 -> 5 -> null 
^
|
cur
pre

1 -> 2 -> 3 -> 4 -> 5 -> null 
          ^
          |
         cur
pre

1 -> 2 -> 3 -> 4 -> 5 -> null 
               ^         ^
               |         |
              pre       cur
```

### 代码

```
var getKthFromEnd = function(head, k) {
    let pre = head, cur = head;
    while(k--) {
        cur = cur.next;
    }

    while(cur) {
        cur = cur.next;
        pre = pre.next;
    }

    return pre
};
```