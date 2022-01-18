class UnionSet {
    constructor (n) {
        this.fa = new Array(n+1)
        for (let i = 0; i <= n; i++) {
            this.fa[i] = i
        }
    }

    get(x) {
        return this.fa[x] = (this.fa[x] == x ? x : this.get(this.fa[x]))
    }

    merge(a, b) {
        this.fa[this.get[a]] = this.get(b)
    }
}