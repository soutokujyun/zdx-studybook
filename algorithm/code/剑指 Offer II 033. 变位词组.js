var groupAnagrams = function(strs) {
    // 主要是建立映射关系
    let map = new Map()
    for (let str of strs) {
        let arr = str.split('')
        s = arr.sort().join('')
        map.set(s, map.get(s) ? [...map.get(s), str]: [str])
    }

    let ans = []
    map.forEach(v => ans.push(v))

    return ans
};