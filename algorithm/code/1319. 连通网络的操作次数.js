class UnionSet {
    constructor(n) {
        this.parent = new Array(n + 1).fill(0).map((v, index) => index)
        this.rank = new Array(n + 1).fill(1)
        this.count = n
    }

    getCount() {
        return this.count
    }

    connected(a, b) {
        return  this.find(a) == this.find(b)
    }

    find(x) {
        if (this.parent[x] != x) {
            this.parent[x] =  this.find(this.parent[x])
        }
        return this.parent[x]
    }

    merge(a, b) {
        let ra = this.find(a), rb = this.find(b)
        if (ra == rb) return
        if (this.rank[ra] < this.rank[rb]) {
            this.parent[ra] = rb
            this.rank[rb] += this.rank[ra]
        } else {
            this.parent[rb] = ra
            this.rank[ra] += this.rank[rb]
        }
        this.count--
    }
}
var makeConnected = function(n, connections) {
    // 连接计算机最小操作次数，也就是计算机的数量减1次
    // 如果线缆数小于最小操作次数 则线缆数不足
    if (connections.length < n - 1) return -1
    // 因为以上的判断，所以底下执行都是在线缆充足的情况下
    let u = new UnionSet(n)
    // 将已有的计算机连通
    for (connection of connections) {
        u.merge(connection[0], connection[1])
    }
    // 需要连接未直连的计算机最少操作次数（未直连的计算机数减1）
    return u.getCount() - 1
};