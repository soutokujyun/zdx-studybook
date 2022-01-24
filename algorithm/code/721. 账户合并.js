var accountsMerge = function (accounts) {
    const emailToIndex = new Map() // 邮箱+坐标
    const emailToName = new Map() // 邮箱+名称
    let emailsCount = 0; // 初始化联通分量，邮箱里面是第几个出现的

    for (const account of accounts) {
        const name = account[0] // 账户名
        const size = account.length
        for (let i = 1; i < size; i++) {
            const email = account[i]
            // 判断邮箱地址是否在map里面
            if (!emailToIndex.has(email)) {
                emailToIndex.set(email, emailsCount++) // 存坐标
                emailToName.set(email, name) // 存名称
            }
        }
    }
    // 将账户的邮箱联通,作为一个集合，当两个账户邮箱相同时，这两个账户的所有邮箱都会联通
    const uf = new UnionFind(emailsCount)
    for (const account of accounts) {
        // 获取第一个邮箱信息
        const firstEmail = account[1];
        const firstEmailIndex = emailToIndex.get(firstEmail);
        const size = account.length;
        for (let i = 1; i < size; i++) {
            // 获取当前账户的后面的邮箱信息
            const nextEmail = account[i];
            const nextEmailIndex = emailToIndex.get(nextEmail)
            // 将第一个和后面的邮箱信息联通
            uf.unit(firstEmailIndex, nextEmailIndex)
        }
    }

    // 将邮箱归类到集合中，用户的邮箱合并
    const indexToEmails = new Map(); // k 并查集祖先坐标， v 所有邮箱集合
    for (const email of emailToIndex.keys()) {
        const index = uf.find(emailToIndex.get(email)); // 获取祖先坐标
        const account = indexToEmails.get(index) ? indexToEmails.get(index) : []
        account.push(email)
        indexToEmails.set(index, account) // 根据祖先坐标分组
    }

    // 用户列表合成
    const merged = []
    // 获取邮箱集合，合成之前按ASCII进行排序
    for (const emails of indexToEmails.values()) {
        
        emails.sort()
        
        const name = emailToName.get(emails[0]) // 用户名
        
        const account = [];
        account.push(name);
        account.push(...emails); // 邮箱地址
        merged.push(account)
    }

    return merged
};
class UnionFind {
    constructor(n) {
        this.parent = new Array(n).fill(0).map((v, index) => index)
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