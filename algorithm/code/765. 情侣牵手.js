/**
 * @param {number[]} row
 * @return {number}
 */
 class UnionFind {
    constructor(n) {
        this.parent = new Array(n).fill(0).map((v, index) => index)
        this.rank = new Array(n).fill(1)
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
var minSwapsCouples = function(row) {
    const len = row.length
    const uf = new UnionFind(len / 2)
    for (let i = 0; i < len; i+=2) {
        uf.merge(row[i] / 2 | 0, row[i + 1] / 2 | 0)
    }
    return len / 2 - uf.getCount()
};