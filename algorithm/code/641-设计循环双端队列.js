/**
* @param {number} k
*/
var MyCircularDeque = function(k) {
    this.queue = new Array(k);
    this.head = 0;
    this.tail = 0;
    this.cnt = 0;
};

/** 
* @param {number} value
* @return {boolean}
*/
MyCircularDeque.prototype.insertFront = function(value) {
    if (this.isFull()) return false;
    this.head = (this.head - 1 + this.queue.length) % this.queue.length;
    this.queue[this.head] = value;
    this.cnt++;
    return true;
};

/** 
* @param {number} value
* @return {boolean}
*/
MyCircularDeque.prototype.insertLast = function(value) {
    if (this.isFull()) return false;
    this.queue[this.tail] = value;
    this.tail = (this.tail + 1) % this.queue.length;
    this.cnt++;
    return true;
};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.deleteFront = function() {
    if (this.isEmpty()) return false;
    this.head = (this.head + 1) % this.queue.length;
    this.cnt--;
    return true;
};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.deleteLast = function() {
    if (this.isEmpty()) return false;
    this.tail = (this.tail - 1 + this.queue.length) % this.queue.length;
    this.cnt--;
    return true; 
};

/**
* @return {number}
*/
MyCircularDeque.prototype.getFront = function() {
    if (this.isEmpty()) return -1;
    return this.queue[this.head]; 
};

/**
* @return {number}
*/
MyCircularDeque.prototype.getRear = function() {
    if (this.isEmpty()) return -1;
    return this.queue[(this.tail - 1 + this.queue.length) % this.queue.length];
};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.isEmpty = function() {
    return this.cnt == 0;
};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.isFull = function() {
    return this.cnt == this.queue.length;
};

/**
* Your MyCircularDeque object will be instantiated and called as such:
* var obj = new MyCircularDeque(k)
* var param_1 = obj.insertFront(value)
* var param_2 = obj.insertLast(value)
* var param_3 = obj.deleteFront()
* var param_4 = obj.deleteLast()
* var param_5 = obj.getFront()
* var param_6 = obj.getRear()
* var param_7 = obj.isEmpty()
* var param_8 = obj.isFull()
*/