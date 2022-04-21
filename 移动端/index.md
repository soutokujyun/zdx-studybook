# 移动端
## 移动端适配
### 视觉窗口设置 viewport
不设置viewport，body默认宽度是980px

```
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
```
缩小的是窗口内容，比如说initial-scale=0.5,body从原来的100px变成200px

```
<script>
    window.devicePixelRatio // 像素比 原先1px的内容放大到n倍
</script>
```
一般手机都有像素比，会导致一些比较精确的图像显示不友好，所以需要还原像素比
```
<script>
(function() {
    var metaEl = document.createElement('meta');
    var scale = devicePixelRatio;
    metaEl.setAttribute('name', 'viewprot');
    metaEl.setAttribute('content','initial-scale=' + (1/scale) + ', maximun-scale=' + (1/scale) + ', minimun-scale=' + (1/scale) + ', user-scalable=no');
    document.documentElement.firstElementChild.appendChild(metaEl);
})()
</script>
```
### 布局适配方案
* 百分比 - 缺点是高度设置麻烦,基于父级高度设置
* rem (过时了)
    * rem：根据根节点（html）的字体大小进行计算 => root + em => html设置font-size:20px,则2rem = 40px
    * em：相对于自身文字大小 => 自身文字大小16px,则1em = 16px
    * 将屏幕分为10分，每一份为 1rem => html {font-size: 108px}  
    ```
    style:
        width: 3rem;
    script:
    {
        let h = document.documentElement;
        h.style.fontSize = window.innerWidth/10 + 'px';
        // 还需要考虑横竖屏切换问题
        window.onresize = () => {
            h.style.fontSize = window.innerWidth/10 + 'px';
        }
    }
    ```
* vw （基本使用）
    * 1屏幕宽度 = 100vw
* media
```
 @media all and (width: 500px) {
     ...
 }
```
## 移动端事件
### MAC下调试
* 在ios设备上打开运行调试：设置->高级->打开“web检查器“
* 在MAC上打开Safari的开发菜单：顶部菜单栏“Safari”->偏好设置-》高级-》打开“在菜单栏中显示“开发”菜单
* 在IOS设备上的Safari浏览器中打开要调试的页面，然后切换到MAC的Safari，在顶部菜单栏选择”开发“-》找到你的ios设备名称-》右边二级菜单选择需要调试的对应标签页，即可开始远程调试。
```
$ npm i anywhere -g
// 在访问目录下
$ anywhere -p 8888
```
### touch
* touchstart 手指在元素摁下
* touchmove 手指在元素下摁下，在屏幕中移动
* touchend 手指在元素下摁下之后，在屏幕中抬起

### 阻止默认事件带来的问题
* document/documentElement/document.body: 默认情况下不允许阻止 touch 的默认事件
* 如果非要阻止，需要在事件添加时设置passive: false
```
addEventListener('事件'，callback, { passive: false })
```
* touchstart: 
    * 所有的mouse事件都会被屏蔽，包括 href
    * 焦点获取或失去焦点事件被屏蔽
    * 阻止滚动条滚动
    * 多指缩放失效
    * 阻止系统菜单 -- 阻止了长按操作
* touchmove:
    * 阻止滚动条滚动
    * 多指缩放失效
* touchend:
    * 所有的mouse事件都会被屏蔽，包括 href
    * 焦点获取或失去焦点事件被屏蔽

## touchEvent移动端坐标获取
* touches 当前屏幕上的手指列表
* targetTouches 当前元素上的手指列表
* changedTouches 触发当前事件的手指列表

### 滑屏操作
```
<script>

{
    let list = document.querySelector("#list");
    let startY = 0; // 摁下时元素的位置
    let translateY = 0;
    let startPointY = 0; // 摁下手指的位置

    list.addEventListener('touchstart',({changedTouches}) => {
        startPointY = changedTouches[0].clientY
        startY = translateY;
    });

    list.addEventListener('touchmove', ({changedTouches}) => {
        let nowPointY = changedTouches[0].clientY;
        let disY = nowPointY - startPointY;
        translateY = startY + disY;
        list.style.transform = `translateY(${translateY}px)`
    })
}
</script>
```

## 手势库封装
### pc端滑屏处理
```
<script>
{
    let list = document.querySelector("#list");
    let startY = 0; // 摁下时元素的位置
    let translateY = 0;
    let startPointY = 0; // 摁下手指的位置

    // 查看是否支持移动端设备
    if ("ontocuhstart" in document) {
        list.addEventListener('touchstart',({changedTouches}) => {
            startPointY = changedTouches[0].clientY
            startY = translateY;
        });

        list.addEventListener('touchmove', ({changedTouches}) => {
            let nowPointY = changedTouches[0].clientY;
            let disY = nowPointY - startPointY;
            translateY = startY + disY;
            list.style.transform = `translateY(${translateY}px)`
        })
    } else {
        let move = (e) => {
            let nowPointY = e.clientY;
            let disY = nowPointY - startPointY;
            translateY = startY + disY;
            list.style.transform = `translateY(${translateY}px)`
        }
        list.addEventListener('mousedown',(e) => {
            startPointY = e.clientY
            startY = translateY;
            document.addEventListener('mousemove',move)
            document.addEventListener('mouseup',() => {document.removeEventListener('mouseup')}, {once:true})
        });
    }
}
</script>
```
### 添加自定义事件
```
box1.addEventListener("click", (e)=> {
    box1.dispatchEvent(Object.assign(new CustomEvent("事件名称"), {
        clientX: e.clientX,
        clientY: e.clientY,
        eventName: "定义的点击事件"
    }))
})
box1.addEventListener('事件名称',() => {
     console.log('事件名称')
 })

```

### 封装
gestrue.js
```
// start、move、end
function enableGestrue(ele) {
    // 摁下
    let onStart = (e) => {
        ele.dispatchEvent(Object.assign(new CustomEvent('start'), {
            clientX: e.clientX,
            clientY: e.clientY
        }))
    }
    let onMove = (e) => {
        ele.dispatchEvent(Object.assign(new CustomEvent('move'), {
            clientX: e.clientX,
            clientY: e.clientY
        }))
    }
    let onEnd = (e) => {
        ele.dispatchEvent(Object.assign(new CustomEvent('end'), {
            clientX: e.clientX,
            clientY: e.clientY
        }))
    }
    if (!("ontouchstart" in document)) {
        let move = (e) => {
            onMove(e)
        }
        let up = (e) => {
            onEnd(e)
            document.removeEventListener("mousemove", move)
        }
        ele.addEventListener("mousedown", (e) => {
            onStart(e)
            document.addEventListener("mousemove", move)
            document.addEventListener("mousemup", up, {once: true})
        })
    }
    ele.addEventListener("touchstart", (e)=>{
        for(let touch of e.changedTouches) {
            onStart(touch)
        }
    })
    ele.addEventListener("touchmove", (e) => {
        for(let touch of e.changedTouches) {
            onMove(touch)
        }
    })
    ele.addEventListener("touchend", (e) => {
        for(let touch of e.changedTouches) {
            onEnd(touch)
        }
    })
}
```
测试
```
{
    enableGestrue(list)
    list.addEventListener('start', (e) => {})
    list.addEventListener('move', (e) => {})
    list.addEventListener('end', (e) => {})
}
```
封装2
```
// start、move、end
// tap 点击 （元素的位置，没有移动，可以认为是点击）
// panstart pan panend 滑动
// pressstart pressend presscancel 长按事件: 开始，结束、取消

function enableGestrue(ele) {
    let contexts = {}
    let MOUSE_TYPE = Symbol("mouse")
    // 摁下
    let onStart = (e, contexts) => {
        ele.dispatchEvent(Object.assign(new CustomEvent('start'), {
            clientX: e.clientX,
            clientY: e.clientY
        }))
        contexts.startX = e.clientX;
        contexts.startY = e.clientY;
        contexts.isTap = true;
        contexts.isPan = false;
        contexts.isPress = false;
        clearTimeout(contexts.timer);
        contexts.timer = setTimeout(() => {
            contexts.isTap = false;
            contexts.isPress = true;
            ele.dispatchEvent(Object.assign(new CustomEvent('pressstart'), {
                clientX: e.clientX,
                clientY: e.clientY
            }));
        }, 500);
    }
    let onMove = (e, contexts) => {
        // 左右移动距离
        let dx = e.clientX - contexts.startX;
        let dy = e.clientY - contexts.startY;
        ele.dispatchEvent(Object.assign(new CustomEvent('move'), {
            clientX: e.clientX,
            clientY: e.clientY
        }));
        // 移动距离小于10
        if (dx ** 2 + dy ** 2 > 100 && (!contexts.isPan)) {
            contexts.isTap = false
            contexts.isPan = true
            clearTimeout(contexts.timer);
            if (contexts.isPress) {
                contexts.isPress = false
                ele.dispatchEvent(Object.assign(new CustomEvent('presscancel'), {
                    clientX: e.clientX,
                    clientY: e.clientY
                }));
            }
            // 开始滑动
            ele.dispatchEvent(Object.assign(new CustomEvent('panstart'), {  
                startX: contexts.startX,
                startY: contexts.startY,
                clientX: e.clientX,
                clientY: e.clientY
            }))
            return
        }
        if (contexts.isPan) {
            // 滑动中
            ele.dispatchEvent(Object.assign(new CustomEvent('pan'), {
                startX: contexts.startX,
                startY: contexts.startY,
                clientX: e.clientX,
                clientY: e.clientY
            }))
        }
    }
    let onEnd = (e, contexts) => {
        clearTimer(contexts.timer)
        ele.dispatchEvent(Object.assign(new CustomEvent('end'), {
            clientX: e.clientX,
            clientY: e.clientY
        }))
        // 如果是点击事件
        if (contexts.isTap) {
            ele.dispatchEvent(Object.assign(new CustomEvent('tap'), {
                clientX: e.clientX,
                clientY: e.clientY
            }))
        }
        if (contexts.isPan) {
            // 滑动结束
            ele.dispatchEvent(Object.assign(new CustomEvent('panend'), {
                startX: contexts.startX,
                startY: contexts.startY,
                clientX: e.clientX,
                clientY: e.clientY
            }))
        }
        if (contexts.isPress) {
            ele.dispatchEvent(Object.assign(new CustomEvent('pressend'), {
                clientX: e.clientX,
                clientY: e.clientY
            }))
        }
    }
    if (!("ontouchstart" in document)) {
        let move = (e) => {
            onMove(e, contexts[MOUSE_TYPE])
        }
        let up = (e) => {
            onEnd(e, contexts[MOUSE_TYPE])
            document.removeEventListener("mousemove", move)
        }
        ele.addEventListener("mousedown", (e) => {
            contexts[MOUSE_TYPE] = {};
            onStart(e, contexts[MOUSE_TYPE])
            document.addEventListener("mousemove", move)
            document.addEventListener("mousemup", up, {once: true})
        })
    }
    ele.addEventListener("touchstart", (e)=>{
        // 多指操作
        for(let touch of e.changedTouches) {
            contexts[touch.identifier] = {};
            onStart(touch, contexts[touch.identifier])
        }
    })
    ele.addEventListener("touchmove", (e) => {
        for(let touch of e.changedTouches) {
            onMove(touch, contexts[touch.identifier])
        }
    })
    ele.addEventListener("touchend", (e) => {
        for(let touch of e.changedTouches) {
            onEnd(touch, contexts[touch.identifier])
        }
    })
}
```