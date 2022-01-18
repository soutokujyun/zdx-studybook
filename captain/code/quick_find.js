// Quick-Find 算法
class UnionSet{
    constructor(n) {
        this.color = new Array(n + 1)
        for (let i = 0; i <= n; i++) {
            color[i] = i
        }
    }

    find(x) {
        return this.color[x]
    }

    merge(a, b) {
        let cb = this.color[b]
        for (let i = 0; i <= n; i++) {
            if (this.color[i] == cb) this.color[i] = this.color[a]
        }
    }
}
