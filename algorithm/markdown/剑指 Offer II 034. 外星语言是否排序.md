某种外星语也使用英文小写字母，但可能顺序 order 不同。字母表的顺序（order）是一些小写字母的排列。

给定一组用外星语书写的单词 words，以及其字母表的顺序 order，只有当给定的单词在这种外星语中按字典序排列时，返回 true；否则，返回 false。

示例 1：
```
输入：words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
输出：true
解释：在该语言的字母表中，'h' 位于 'l' 之前，所以单词序列是按字典序排列的。
```
示例 2：
```
输入：words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
输出：false
解释：在该语言的字母表中，'d' 位于 'l' 之后，那么 words[0] > words[1]，因此单词序列不是按字典序排列的。
```
示例 3：
```
输入：words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
输出：false
解释：当前三个字符 "app" 匹配时，第二个字符串相对短一些，然后根据词典编纂规则 "apple" > "app"，因为 'l' > '∅'，其中 '∅' 是空白字符，定义为比任何其他字符都小（更多信息）。
```
### 解题思路
这一题主要先把外星语言字母表与地球语言字母表建立一个映射关系, 然后根据映射关系将外星字符转成地球字符，通过判断当前字符的每一个字母与前一个字符的对于的字母的大小关系：当当前字符的字母小于前一个字符对应的字母时，返回false，否则返回true

### 代码
```
var isAlienSorted = function(words, order) {
    let map = new Map()
    for (let i = 0; i < order.length; i++) map.set(order[i], String.fromCharCode(97 + i))
    for (let i = 0; i < words.length; i++) {
        words[i] = [...words[i]].reduce((a, c) => a + map.get(c), '');
        if (i && words[i] < words[i - 1]) return false;
    }
    return true;
}
```