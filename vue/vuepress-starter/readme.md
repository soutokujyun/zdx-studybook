# 指南
## 快速开始
```
pnpm create vuepress vuepress-starter
```
## 页面
### 路由
```
└─ docs
   ├─ guide
   │  ├─ getting-started.md
   │  └─ README.md
   ├─ contributing.md
   └─ README.md
```
对应路径:
| 相对路径    | 路由路径 |
| ----------- | ----------- |
| /README.md  | /       |
| /index.md   | /        |
| /contributing.md   | /contributing.html        |
| /guide/README.md   | /guide/   |
| /guide/getting-started.md | /guide/getting-started.html  |
### 页面级作用域的配置
在markdown文件的开头添加配置项:
```
---
lang: zh-CN
title: Getting Started
description: Getting Started页面的描述
---
# 其他markdown内容
```
## markdown
### 语法拓展
1. 表格
```
| 姓名 | 年龄 | 性别 |
| ---- | ---- | ---- |
| 张三 | 18   | 男   |
```
2. 删除线
```
~~这是一段被删除的文字~~
```
3. 链接
```
[相对路径](../README.md)
[绝对路径](/guide/README.md) -- 以docs为根目录
[url](https://www.baidu.com)
```
4. Emoji :EMOJICODE:
5. 目录
如果你想要把当前页面的目录添加到 Markdown 内容中，你可以使用 [[toc]] 语法。
```
[[toc]]
```
6. 代码块
代码标题
```ts title="index.ts"
var a = 1;
```
行高亮
```ts title="index.ts" {2}
var a = 1; // 这一行会被高亮
var b = 2
```
行号默认启用
```ts:no-line-numbers
// 行号被禁用
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```
添加 v-pre -- 避免代码块被 Vue 编译
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
7. 导入代码块
```
@[code](../foo.js)
导入第 1 至 3 行代码
@[code{1-3}](../foo.js)
指定代码语言
@[code js](../foo.js)
```