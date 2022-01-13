/**
 * initialize your data structure here.
 */
 var MedianFinder = function() {
    this.data = []
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    this.data.push(num)
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    (this.data).sort((a,b) => a - b)
    const len = this.data.length
    if (len % 2 == 0) {
        return (this.data[len / 2] + this.data[len / 2 - 1]) / 2
    } else {
        return this.data[(len - 1) / 2]
    }
};