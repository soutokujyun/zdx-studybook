var copyRandomList = function(head) {
    let pre = head;
    while (pre) {
        pre.next = new Node(pre.val, pre.next, null)
        pre = pre.next;
    }

    pre = head;
    while(pre) {
        pre.next.random = pre.random ? pre.random.next : null;
        pre = pre.next;
    }

    pre = head;
    let newNode = cur = pre.next;

    while (pre) {
        pre.next = pre.next.next;
        cur.next = cur.next ? cur.next.next : null;
        pre = pre.next;
        cur = cur.next;
    }

    return newNode;
}