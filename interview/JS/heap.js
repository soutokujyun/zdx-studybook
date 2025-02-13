class Heap {
    constructor(data) {
        this.data = data || []
        this.heapify()
    }

    heapify() {
        if (this.size() < 2) return
        for (let i = 1; i < this.size(); i++) {
            this.shiftUp(i)
        }
    }

    push(val) {
        this.data.push(val)
        this.shiftUp(this.data.length - 1)
    }
    pop() {
        if (this.size() > 1) {
            let temp = this.data[0]
            this.data[0] = this.data.pop()
            this.shiftDown(0)
            return temp
        } else {
            return this.data.pop()
        }
    }
    top() {
        return this.data[0]
    }

    size() {
        return this.data.length
    }

    swap(i, j) {
        [this.data[i], this.data[j]] = [this.data[j], this.data[i]]
    }

    comparator(i, j) {
        return this.data[i] - this.data[j]
    }

    shiftUp(index) {
        if (this.size() < 2) return
        while (index) {
            let parent = (index - 1) >> 1;
            if (this.comparator(parent, index) > 0) {
                this.swap(parent, index)
                index = parent
            } else {
                break;
            }
        }
    }

    shiftDown(index) {
        if (this.size() < 2) return
        while (index < this.data.length) {
            let temp = index, left = index * 2 + 1, right = index * 2 + 2
            
            if (left < this.data.length && this.comparator(temp, left) > 0) {
                temp = left
            }
            if (right < this.data.length && this.comparator(temp, right) > 0) {
                temp = right
            }

            if (index == temp) break
            this.swap(temp, index)
            index = temp

        }
    }
}

/**
 * 
 *          0
 *       1     2
 *     3  4   5  6
 * 
 */

const arr = [1, 3, 2, 6, 7, 5]
const h = new Heap(arr)
console.log(h.data);

// while (h.size() > 1) {
    let s1 = h.pop()
    // let s2 = h.pop()
    console.log(s1);

    let s2 = h.pop()
    console.log(s2);
// }