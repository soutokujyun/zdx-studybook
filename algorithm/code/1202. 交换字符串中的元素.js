 class UnionFind {
    constructor(n) {
        this.parent = new Array(n).fill(0).map((v, index)=>index)
        this.rank = new Array(n).fill(1)
        this.count = n
    }

    getCount() {
        return this.count
    }

    find(x) {
        if (this.parent[x] != x) {
            this.parent[x] = this.find(this.parent[x])
        }
        return this.parent[x]
    }

    unit(a, b) {
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
var smallestStringWithSwaps = function(s, pairs) {
    let uf = new UnionFind(s.length)
    // 1. 将可以进行交换的字符进行联通
    for(pair of pairs) {
        uf.unit(pair[0], pair[1])
    }

    // 2. 将联通的字符串存入到一个新的数组里面进行排序
    let charCodeArr = new Array(s.length).fill(0).map(()=>new Array())
    for(let i = 0; i < s.length; i++) {
        charCodeArr[uf.find(i)].push(s[i])
    }

    // 3. 将每组字符串按照字典序列排序（转成ASCII）
    for (let i = 0; i < s.length; i++) {
        if (charCodeArr[i].length) {
            charCodeArr[i].sort((a,b)=> b.charCodeAt() - a.charCodeAt())
        }
    }
    // 4. 通过原始字符下标获取字符串的组号，拼接字符串
    let ans = new Array(s.length)
    for (let i = 0; i < s.length; i++) {
        // 当前字符的组号
        let index = uf.find(i)
        // 当前字符数组
        let str = charCodeArr[index]
        // 获取当前字符数组的最后一个字符填充到返回数组中
        ans[i] = str.pop()
    }

    return ans.join('')
};