// 利用2个双端队列维护,让两个队列的长度不超过1
var FrontMiddleBackQueue = function() {
    this.leftArr = [];
    this.rightArr = []; // rightArr队列作为主队列
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function(val) {
    this.leftArr.unshift(val);
    if (this.leftArr.length > this.rightArr.length) {
        this.rightArr.unshift(this.leftArr.pop());
    }
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function(val) {
    if (this.leftArr.length == this.rightArr.length) {
        this.rightArr.unshift(val)
    } else {
        this.leftArr.push(val)
    }
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function(val) {
    if (this.leftArr.length < this.rightArr.length) {
        this.leftArr.push(this.rightArr.shift())
    }
    this.rightArr.push(val);
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function() {
    if (this.leftArr.length || this.rightArr.length) {
        if (this.leftArr.length < this.rightArr.length) {
            this.leftArr.push(this.rightArr.shift())
        }
        return this.leftArr.shift()
    }
        
    return -1;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function() {
    if (this.leftArr.length || this.rightArr.length) {
        if (this.leftArr.length == this.rightArr.length) {
            return this.leftArr.pop();
        } else {
            return this.rightArr.shift();
        }
    }

    return -1;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function() {
    if (this.leftArr.length || this.rightArr.length) {
        if (this.leftArr.length == this.rightArr.length) {
            this.rightArr.unshift(this.leftArr.pop());
        }
        return this.rightArr.pop();
    }

    return -1;
};

/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * var obj = new FrontMiddleBackQueue()
 * obj.pushFront(val)
 * obj.pushMiddle(val)
 * obj.pushBack(val)
 * var param_4 = obj.popFront()
 * var param_5 = obj.popMiddle()
 * var param_6 = obj.popBack()
 */