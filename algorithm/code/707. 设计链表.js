var ListNode = function(val, next = null) {
    this.val = val;
    this.next = next;
}

var MyLinkedList = function() {
    // 设置链表虚拟头节点以便操作头节点添加
    this.hair = new ListNode(-1);
    // 记录当前节点个数
    this.cnt = 0;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    let pre = this.hair.next
    while(index--) {
        pre = pre ? pre.next: null;
    }
    return pre ? pre.val : -1;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    this.hair.next = new ListNode(val, this.hair.next);
    this.cnt++
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    let pre = this.hair;
    while (pre.next) {
        pre = pre.next
    }
    pre.next = new ListNode(val, null);
    this.cnt++
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (index > this.cnt) return
    if (index < 0) {
        this.addAtHead(val)
        this.cnt++
        return
    }

    let pre = this.hair
    while(index--) {
        pre = pre.next;
    }
    pre.next = new ListNode(val, pre.next)
    this.cnt++
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    // 当前index如果不在节点下标范围内，就不需要操作
    if (index >= this.cnt || index < 0) return
    let pre = this.hair
    while(index--) {
        pre = pre.next;
    }
    // h 1 2 3
    pre.next = pre.next ? pre.next.next : null;
    this.cnt--
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */