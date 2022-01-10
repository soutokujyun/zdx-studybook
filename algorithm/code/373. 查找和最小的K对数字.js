class Heap {
    constructor() {
        this.data = [];
    }

    swap(i, j) {
        [this.data[i], this.data[j]] = [this.data[j], this.data[i]]
    }

    compartor(i, j) {
        return (this.data[i][0] + this.data[i][1]) - (this.data[j][0] + this.data[j][1]);
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
            if (this.compartor(index, parent) > 0) {
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
            if (left <= last && this.compartor(left, temp) > 0) {
                temp = left;
            }
            if (right <= last && this.compartor(right, temp) > 0) {
                temp = right;
            }
            if (temp == index) break;
            this.swap(temp, index);
            index = temp;
        }
    }
}
var kSmallestPairs = function(nums1, nums2, k) {
    let h = new Heap();
    for (x of nums1) {
        for (y of nums2) {
            let temp = [];
            temp[0] = x; temp[1] = y;
            h.offer(temp);
            if (h.size() > k) h.pop(); 
        }
    }
    return h.data;
};