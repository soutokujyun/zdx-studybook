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
var findCircleNum = function(isConnected) {
    let n = isConnected.length;
    let u = new UnionSet(n)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (isConnected[i][j]) u.merge(i, j)
        }
    }
    let ans = 0
    for (let i = 0; i < n; i++) {
        if (u.find(i) == i) ans += 1
    }
    return ans
};