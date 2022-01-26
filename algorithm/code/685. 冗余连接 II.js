class UnionFind {
    constructor(n) {
        this.fa = new Array(n)
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

    unit(a, b) {
        this.fa[this.find(a)] = this.find(b)
    }
}
var findRedundantDirectedConnection = function(edges) {
    let nodeCount = edges.length
    let uf = new UnionFind(nodeCount+1)

    let parent = []
    for (let i = 1; i < (nodeCount + 1); i++) {
        parent[i] = i
    }

    let conflit = -1
    let cycle = -1

    for (i in edges) {
        let edge = edges[i]
        let node1 = edge[0], node2 = edge[1]
        if (parent[node2] != node2) { // 有冲突边
            conflit = i
        } else {
            parent[node2] = node1
            if (uf.find(node1) == uf.find(node2)) { // 有环路
                cycle = i;
            } else {
                uf.unit(node1, node2)
            }
        }
    }

    if (conflit < 0) {
        return edges[cycle]
    } else {
        let conflitEdge = edges[conflit]
        if (cycle >= 0) {
            return [parent[conflitEdge[1]], conflitEdge[1]]
        } else {
            return conflitEdge
        }
    }
};