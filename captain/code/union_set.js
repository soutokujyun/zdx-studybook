class UnionSet {
    constructor(n) {
        this.count = n
        this.rank = new Array(n + 1).fill(1)
        this.parent = new Array(n + 1).fill(0).map((v, index) => index)
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