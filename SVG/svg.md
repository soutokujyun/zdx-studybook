# SVG
https://juejin.cn/post/7118985770408345630?searchId=202408081120146B9513B6D718CC41086B
## SVG的使用方式
1. 在浏览器直接打开
  - xml 是浏览器能读取的格式，但如果希望 svg 能在浏览器中渲染出来，需要使用 xmlns 声明渲染规则。所以必须使用 xmlns="http://www.w3.org/2000/svg"。
```svg
<?xml version="1.0" ?>

<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <title>雷猴</title>
  <circle cx="50" cy="50" r="50" fill="hotpink"></circle>
</svg>
```
2. 内嵌到 HTML 中（推荐⭐⭐⭐）
```
<html>
  <body>
    <svg width="100%" height="100%" version="1.1">
      <circle cx="50" cy="50" r="50" fill="hotpink"></circle>
    </svg>
  </body>
</html>
```
3. CSS 背景图（推荐⭐）
```
<style>
.svg_bg_img {
  width: 100px;
  height: 100px;
  background: url('./case1.svg') no-repeat;
  background-size: 100px 100px;
}
</style>

<div class="svg_bg_img"></div>
```
4. 使用 img 标签引入（推荐⭐）
```
<img src="./case1.svg" width="100" height="100">
```
5. 使用 iframe 标签引入（不推荐❌）
```
<iframe
  src="./case1.svg"
  width="100"
  height="100"
></iframe>
```
6. 使用 embed 标签引入（不推荐❌）
`<embed>`标签定义了一个容器，用来嵌入外部应用或者互动程序。它也可以插入各种媒体资源。
```
<embed
  src="./case1.svg"
  width="100"
  height="100"
/>
```
7. 使用 object 标签引入（不推荐❌）
`<object>` 是通过 data 属性引入资源的。它可以用于嵌入图像，类似 `<img>` ，也可以用于嵌入独立的 HTML 文档，类似 `<iframe>` 。
```
<object
  data="./case1.svg"
  type="image/svg+xml"
  codebase="http://www.adobe.com/svg/viewer/install"
></object>
```
## SVG 默认宽高
在不给 `<svg>` 设置宽高时，它的默认宽度是 300px ，默认高度是 150px 。这点和 `<canvas>` 是一样的。

## 基础图形
### 矩形
使用 `<rect>` 标签。基础属性：
- x：矩形左上角的 x 坐标
- y：矩形左上角的 y 坐标
- width：矩形的宽度
- height：矩形的高度
- rx：圆角, x轴半径
- ry：圆角, y轴半径
### 圆形
使用 `<circle>` 标签。基础属性：
- cx：圆心 x 坐标
- cy：圆心 y 坐标
- r：半径
### 椭圆
使用 `<ellipse>` 标签。基础属性：
- cx：椭圆中心 x 坐标
- cy：椭圆中心 y 坐标
- rx：椭圆 x 轴半径
- ry：椭圆 y 轴半径
### 直线
使用 `<line>` 标签。基础属性：
- x1：直线起点 x 坐标
- y1：直线起点 y 坐标
- x2：直线终点 x 坐标
- y2：直线终点 y 坐标
- stroke：直线颜色
- stroke-width：直线宽度
- stroke-linecap：直线端点样式
### 折线
使用 `<polyline>` 标签。基础属性：
- points：折线点集，用逗号分隔
- stroke：直线颜色
- stroke-width：直线宽度
- fill: 填充颜色
### 多边形
使用 `<polygon>` 标签。基础属性：
- points：多边形点集，用逗号分隔
- stroke：直线颜色
- fill: 填充颜色
`<polygon>` 会自动闭合（自动将起始点和结束点链接起来）。
### 直线
使用 `<path>` 标签。基础属性：
- d：路径描述
  - M：起始点坐标
  - L：直线终点坐标
  - l：直线相对起点坐标
  - H：水平线
  - h：水平线相对起点坐标
  - V：垂直线
  - v：垂直线相对起点坐标
  - C：贝塞尔曲线控制点坐标
  - c：贝塞尔曲线控制点相对起点坐标
  - Z：闭合路径

