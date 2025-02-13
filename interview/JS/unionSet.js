class UnionSet {
    constructor(n, total) {
        this.size = new Array(n + 1)
        this.father = new Array(n + 1)
        for (let i = 0; i <= n; i++) {
            this.father[i] = i
            this.size[i] = 1
        }
        this.count = total
    }

    getCount() {
        return this.count
    }

    find(x) {
        if (this.father[x] == x) return x
        let root = this.find(this.father[x])
        this.father[x] = root
        return root
    }

    merge(a, b) {
        let ra = this.find(a), rb = this.find(b)
        if (ra == rb) return
        if (this.size[ra] < this.size[rb]) {
            this.father[ra] = rb
            this.size[rb] += this.size[ra]
        } else {
            this.father[rb] = ra
            this.size[ra] += this.size[rb]
        }
        this.count--
    }
}

var numIslands = function(grid) {
    let n = grid.length, m = grid[0].length
    
    let total = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] == 1) total++
        }
    }

    let us = new UnionSet(n * m, total)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // 左
            if (grid[i][j] == 1 && j - 1 >= 0 && grid[i][j - 1] == 1) {
                us.merge((n * i) + (1 + j + i), (n * i) + (j + i))
            }
            // 上
            if (grid[i][j] == 1 && i - 1 >= 0 && grid[i - 1][j] == 1) {
                us.merge((n * i) + (1 + j + i), (n * (i - 1)) + (1 + j + i))
            }
        }
    }

    return us.getCount()
};

// var grid = [
//     ["1","1","0","0","0"],
//     ["1","1","0","0","0"],
//     ["0","0","1","0","0"],
//     ["0","0","0","1","1"]
//   ]

// let count = numIslands(grid)

// console.log(count);

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

let s = "edcab", pairs = [[4,1],[3,2]]; // "ebacd"
let uf = new UnionFind(s.length)
for(pair of pairs) {
    uf.unit(pair[0], pair[1])
}

let charCodeMap = new Map()
for(let i = 0; i < s.length; i++) {
    charCodeMap.set(uf.find(i), charCodeMap.get(uf.parent[i]) ? [...charCodeMap.get(uf.parent[i]), s[i]] : [s[i]])
}

charCodeMap.forEach((value, key) => {
    charCodeMap.set(key, value.sort((a,b)=>b-a))
});

let charData = new Array(s.length)

for (let i = 0; i < s.length; i++) {
    let index = uf.find(i)
    let strings = charCodeMap.get(index)
    charData[i] = strings.pop()
}

console.log(charData.join(''));