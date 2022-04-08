class Heap {
    constructor() {
        this.data = [];
    }

    swap(i, j) {
        [this.data[i], this.data[j]] = [this.data[j], this.data[i]]
    }

    compartor(i, j) {
        return this.data[i].val - this.data[j].val;
    }

    size() {
        return this.data.length;
    }

    peek() {
        if (!this.size()) return null;
        return this.data[0]
    }

    offer(val) {
        this.data.push(val);
        this.bubbleUp(this.data.length-1);
    }

    pop() {
        if (!this.size()) return null;
        let res = this.data[0];
        if (this.size() > 1) {
            this.data[0] = this.data.pop();
            this.bubbleDown(0);
        } else {
            this.data.pop();
        }
        return res;
    }

    bubbleUp(index) {
        while(index) {
            let parent = (index - 1) >> 1;
            if (this.compartor(index, parent) < 0) {
                this.swap(index, parent);
                index = parent;
            } else {
                break;
            }
        }
    }

    bubbleDown(index) {
        let last = this.data.length - 1;
        while(index < last) {
            let temp = index, left = index * 2 + 1, right = index * 2 + 2;
            if (left <= last && this.compartor(left, temp) < 0) {
                temp = left;
            }
            if (right <= last && this.compartor(right, temp) < 0) {
                temp = right;
            }
            if (temp == index) break;
            this.swap(temp, index);
            index = temp;
        }
    }
}
var mergeKLists = function(lists) {
    let h = new Heap()
    for (const head of lists) {
        if (head == null) continue
        h.offer(head)
    }

    let ret = new ListNode(-1), p = ret
    while(h.size() > 0) {
        let cur = h.pop()
        p.next = cur
        p = cur
        if (cur.next) h.offer(cur.next)
    }
    return ret.next
};