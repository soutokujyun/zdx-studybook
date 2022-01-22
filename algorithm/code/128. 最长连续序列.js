class UnionSet {
    constructor(n) {
        this.parent = new Array(n + 1).fill(0).map((v, index) => index)
        this.rank = new Array(n + 1).fill(1)
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
var longestConsecutive = function(nums) {
    if (!nums.length) return 0
    // 存储数组下标
    let ind = new Array()
    let u = new UnionSet(nums.length)
    for ([i, num] of nums.entries()) {
        // 消除重复值
        if (ind[num] != ind[ind.length]) continue;
        // 如果当前数的前一个数有值
        if (ind[num - 1] !== undefined) {
            // 合并的是数组下标
            u.merge(i, ind[num - 1])
        }
        // 如果当前数的后一个数有值
        if (ind[num + 1] !== undefined) {
            u.merge(i, ind[num + 1])
        }
        ind[num] = i // nums下标
    }

    let ans = 0
    for (let i = 0; i < nums.length; i++) {
        // 如果当前下标是树的根节点，且树节点长度大于ans
        if (u.find(i) == i && u.rank[i] > ans) ans = u.rank[i]
    }
    return  ans
};