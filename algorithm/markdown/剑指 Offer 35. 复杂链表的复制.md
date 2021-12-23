请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

## 解题思路
可以将每个节点复制一份，跟在节点的后面，然后复制的节点randdom应该指向它的指向节点的下一个节点。

```
1 -> 2 -> 3 -> 4 -> null;
|         ^
|_________|
 1.random

1 -> 1`-> 2 -> 2` -> 3 -> 3`-> 4 -> 4`->null
|                    ^
|____________________|
        1.random

1 -> 1`-> 2 -> 2` -> 3 -> 3`-> 4 -> 4`->null
     |                    ^
     |____________________|
          1.random.next

    |--------|
pre |       \/
1   1`  2 -> 2` -> 3 -> 3`-> 4 -> 4`->null
| pre.n  ^
|________|

```

### 代码
```
var copyRandomList = function(head) {
    let pre = head;
    // 复制节点到每个节点的后面
    while(pre) {
        pre.next = new Node(pre.val, pre.next, null);
        pre = pre.next.next;
    }
    
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
```