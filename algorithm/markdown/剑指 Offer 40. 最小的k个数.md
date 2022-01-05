输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

### 解题思路
利用大顶堆来维护前 k 个大的数，也就是找出其中最小的 k 个数

### 代码
```
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
        while (index < last) {
            let temp = index, left = index * 2 + 1, right = index * 2 + 2
            if (right <= last && this.compartor(left, temp) > 0) {
                temp = left
            }
            if (right <= last && this.compartor(right, temp) > 0) {
                temp = right
            }
            
            if (temp == index) break;
            this.swap(temp, index)
            index = temp
        }
    }
}
var getLeastNumbers = function(arr, k) {
    if (arr.length < k) return arr
    let h = new Heap()

    for (i of arr) {
        h.offer(i)
        if (h.size() > k) h.pop()
    }

    return h.data
};
```