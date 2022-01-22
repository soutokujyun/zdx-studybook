class UnionSet {
    constructor(n) {
        this.size = new Array(n + 1)
        this.fa = new Array(n + 1)
        for (let i = 0; i <= n; i++) {
            this.fa[i] = i;
            this.size[i] = 1
        } 
    }

    isMerge(a, b) {
        let ra = this.find(a), rb = this.find(b)
        if (ra == rb) return true
        return false
    }

    find(x) {
        if (this.fa[x] == x) return x;
        let root =  this.find(this.fa[x])
        this.fa[x] = root
        return root
    }

    merge(a, b) {
        let ra = this.find(a), rb = this.find(b)
        if (ra == rb) return
        if (this.size[ra] < this.size[rb]) {
            this.fa[ra] = rb
            this.size[rb] += this.size[ra]
        } else {
            this.fa[rb] = ra
            this.size[ra] += this.size[rb]
        }
    }
}
var findRedundantConnection = function(edges) {
    let u = new UnionSet(edges.length)
    for (edge of edges) {
        if (u.isMerge(edge[0], edge[1])) {
            return edge
        }
        u.merge(edge[0], edge[1])
    }
};