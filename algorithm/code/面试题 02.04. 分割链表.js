var partition = function(head, x) {
    let samllHair = new ListNode(-1, null), small = samllHair;
    let largeHair = new ListNode(-1, null), large = largeHair;

    while (head) {
        if (head.val < x) {
            samllHair.next = head;
            samllHair = samllHair.next
        } else {
            largeHair.next = head;
            largeHair = largeHair.next;
        }
        head = head.next;
    }

    largeHair.next = null
    samllHair.next = large.next

    return small.next;
};