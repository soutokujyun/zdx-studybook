class UnionSet {
    constructor(n) {
        this.size = new Array(n+1)
        this.fa = new Array(n+1)
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
var equationsPossible = function(equations) {
    let u = new UnionSet(26)
    for (let str of equations) {
        if (str[1] == '=') {
            u.merge(str[0].charCodeAt() - 97, str[3].charCodeAt() - 97)
        } 
    }
    for (let str of equations) {
        if (str[1] == '!' && u.isMerge(str[0].charCodeAt() - 97, str[3].charCodeAt() - 97)) {
            return false
        }
    }

    return true
};