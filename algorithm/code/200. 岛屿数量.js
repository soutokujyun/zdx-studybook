var total;
var numIslands = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let uf = new UnionFind(m*n);
    total = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] == '1') total++; 
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                if (i - 1 >= 0 && grid[i-1][j] == '1') uf.unite(i * n + j, (i - 1) * n + j);
                if (j - 1 >= 0 && grid[i][j-1] == '1') uf.unite(i * n + j, i * n + j - 1);
            }
        }
    }
    return total;
};
class UnionFind {
    constructor(n) {
      this.parent = new Array(n).fill(0).map((x, index) => index);
      this.rank = new Array(n).fill(1);
      this.count = n;
    }
  
    getCount() {
        return this.count;
    }
  
    find(x) {
      if (this.parent[x] !== x) {
        this.parent[x] = this.find(this.parent[x]);
      }
      return this.parent[x];
    }
  
    unite(x, y) {
      let rootX = this.find(x);
      let rootY = this.find(y);
      if (rootX == rootY) return;
      if (this.rank[rootX] < this.rank[rootY]) {
        [rootX, rootY] = [rootY, rootX];
      }
      total--;
      this.parent[rootY] = rootX;
      this.rank[rootX] += this.rank[rootY];
      this.count--;
    }
  
    connected(x, y) {
      return this.find(x) === this.find(y);
    }
  }