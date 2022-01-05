class Heap {
    constructor() {
        this.data = []
    }
    offer(val) {
        this.data.push(val)
        this.bubbleUp(this.data.length - 1)
    }
    size() {
        return this.data.length
    }
    top() {
        return this.data[0]
    }
    pop() {
        if (!this.size()) return null
        if (this.size() > 1) {
            this.data[0] = this.data.pop()
            this.bubbleDown(0)
        } else {
            this.data.pop()
        }
    }
    compartor(a, b) {
        return this.data[a] - this.data[b]
    }
    swap(a, b) {
        [this.data[a], this.data[b]] = [this.data[b], this.data[a]]
    }
    bubbleUp(index) {
        while(index) {
            let parent = (index - 1) >> 1
            if (this.compartor(index, parent) > 0) {
                this.swap(index, parent)
                index = parent
            } else {
                break
            }
        }
    }
    bubbleDown(index) {
        let last = this.data.length - 1
        while (index * 2 + 2 < last) {
            let temp = index, left = index * 2 + 1, right = index * 2 + 2
            if (this.compartor(temp, left) > 0) {
                temp = left
            }
            if (right <= last && this.compartor(temp, right) > 0) {
                temp = right
            }
            
            if (temp == index) break;
            this.swap(temp, index)
            index = temp
        }
    }
}