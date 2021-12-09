var RecentCounter = function() {
    this.queue = [];
};

RecentCounter.prototype.ping = function(t) {
    // 主要是保存 [t-3000, t] 之间的请求ip
    this.queue.push(t);
    while(t - this.queue[0] > 3000) {
        this.queue.shift()
    }
    return this.queue.length;
};