---
home: true
title: Home
---
[[toc]]
## 表格
| 姓名 | 年龄 | 性别 |
| ---- | ---- | ---- |
| 张三 | 18   | 男   |
## 删除线
~~删除线~~
## 高亮
`高亮`
## url
[相对路径](./guide/README.md)

[绝对路径--以docs为根目录](/guide/README.md)

[url](https://www.baidu.com)
## Emoji :smile:
VuePress 2 已经发布 :tada: ！

前往 [emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet) 来查看所有可用的 Emoji 表情和对应代码。
## 代码块
```ts title="index.ts"
var a = 1;
```
```ts{1} title="index.ts"
var a = 1; // 这一行会被高亮
var b = 2
```
```ts:no-line-numbers
// 行号被禁用
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```
```md
<!-- 默认情况下，这里会被保持原样 -->

1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- 这里会被 Vue 编译 -->

1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```js:no-v-pre
// 由于 JS 代码高亮，这里不会被正确编译
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```