/**
 * initialize your data structure here.
 */
 var MedianFinder = function() {
    this.item = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    this.item.push(num);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    (this.item).sort((a, b) => a - b);

    // 判断总数量是否为偶数
    if (this.item.length % 2) {
        return this.item[(this.item.length - 1) / 2];
    } else {
        return (this.item[this.item.length / 2] + this.item[this.item.length / 2 - 1]) / 2;
    }
};