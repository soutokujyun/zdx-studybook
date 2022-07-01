// LRU (Least Recently Used) ———— 最近最少使用缓存算法
// 在Vue中 <keep-alive max="2"></keep-alive> 组件中使用了LRU算法来缓存动态组件
// max是最多可以缓存几个组件

class LRUCache{
    constructor(limit) {
        // 缓存数量
        this.limit = limit
        this.cache = new Map()
    }

    put(key, value) {
        // 判断是否已经缓存了该数据，将数据放到最前面的位置
        if (this.cache.has(key)) {
            // 如果已缓存则删除
            this.cache.delete(key)
        }
        // 判断缓存数据是否已经超过最大值，如果超过需要将很久不使用的数据从缓存中删除
        if (this.cache.size >= this.limit) {
            // 获取Map中第一个key
            const key = this.cache.keys().next().value
            this.cache.delete(key)
        }
        // 数据缓存
        this.cache.set(key, value)
        
    }

    get(key) {
        // 特判：缓存是否存在
        if (this.cache.has(key)) {
            // 存在则将数据放到最前面的位置
            const value = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key, value)
            return value
        }
        return null
    }
}

let lru = new LRUCache(2)
lru.put('1', '1'); // [[1, 1]]
lru.put('2', '2'); // [[1, 1], [2, 2]]
lru.get('1')  // [[2, 2], [1, 1]]
lru.put('3', '3');  // [[1, 1], [3, 3]]
console.log(Array.from(lru.cache));  // [[1, 1], [3, 3]]