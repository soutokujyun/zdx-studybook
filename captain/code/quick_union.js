// Quick-Union 算法
class UnionSet {
    constructor(n) {
        this.boss = new Array(n + 1)
        for (let i = 0; i <= n; i++) {
            this.boss[i] = i
        }
    }

    find(x) {
        if (this.boss[x] == x) return x;
        return this.find(this.boss[x])
    }

    merge(a, b) {
        let fa = this.find(a), fb = this.find(b)
        if (fa == fb) return ;
        this.boss[fa] = fb;
    }

}