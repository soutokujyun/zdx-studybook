给定一个字符串数组 strs ，将 变位词 组合在一起。 可以按任意顺序返回结果列表。

注意：若两个字符串中每个字符出现的次数都相同，则称它们互为变位词。

示例 1:
```
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
```
示例 2:
```
输入: strs = [""]
输出: [[""]]
```
示例 3:
```
输入: strs = ["a"]
输出: [["a"]]
```
### 解题思路
这一题主要还是需要建立排序后的字符串与字符串的映射关系
1. 首先先把每个字符串取出，然后将字符串排序
2. 然后将字符串存入以排序后的字符串为key的映射的数组中

### 代码
```
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
```