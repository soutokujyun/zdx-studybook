class UnionSet {
    constructor(n) {
        this.fa = new Array(n+1)
        for (let i = 0; i <= n; i++) {
            this.fa[i] = i;
        } 
    }

    find(x) {
        if (this.fa[x] == x) return x;
        let root =  this.find(this.fa[x])
        this.fa[x] = root
        return root
    }

    merge(a, b) {
        let ra = find(a), rb = find(b)
        if (ra == rb) return
        this.fa[ra] = rb
    }
}