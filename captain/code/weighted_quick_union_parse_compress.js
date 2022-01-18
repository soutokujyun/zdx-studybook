class UnionSet {
    constructor(n) {
        this.size = new Array(n+1)
        this.fa = new Array(n+1)
        for (let i = 0; i <= n; i++) {
            this.fa[i] = i;
            this.size[i] = 1
        } 
    }

    find(x) {
        if (this.fa[x] == x) return x;
        let root =  this.find(this.fa[x])
        fa[x] = root
        return root
    }

    merge(a, b) {
        let ra = find(a), rb = find(b)
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