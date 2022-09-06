# html5新特性

## Canvas元素
canvas元素用于在网页上绘制图形，有多重绘制路径、矩形、圆形、字符以及添加图像的方法

## 表单元素
1. 新增表单元素
* <datalist>：元素规定输入域的选项列表，使用<input>元素的list元素与<datalist>元素的id绑定
* <keygen>：提供一种检验用户的可靠方法，标签规定用于表单的密钥对生成器字段
* <output>：用于不用类型的输出，比如计算或脚本输出

2. 新增的表单属性
* placehoder属性：简短的提示在用户输入值前会显示在输入域上，既默认框提示
* required属性：是一个boolean属性，要求填写的输入域不为空
* pattern属性：描述了一个正则表达式用于验证<input>元素的值
* max / min属性：最大最小值
* step属性：为输入域规定合法的数字间隔
* height / width属性：用于image类型的<input>标签的图像高度和宽度
* autofocus属性：是一个boolean属性，在页面加载时自动获得焦点
* multiple属性：是一个boolean属性，规定<input>元素中选择多个值

## 媒体元素
1. 播放音频文件的元素<audio>
* control属性提供播放暂停和音量控件
* 支持三种音频格式文件：mp3、wax、ogg

2. 播放视屏文件的元素<video>
* control属性提供播放暂停和音量控件，也可以使用dom操作：play()和pause()
* video元素提供了width和height控制视频的尺寸

## 地理定位
HTML5 Geolocation（地理定位）用于定位用户的位置

## 拖放
```<img draggable="true">```

## web存储
* localStrorage——没有时间限制的数据存储，存在本地
* sessionStrorage——有时间限制的数据存储，针对一个session，本次会话结束（关闭浏览器）数据删除

## 应用程序缓存（Application Cache） -- PWA

## Web Workers

## WebSocket