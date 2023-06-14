# Iframe父子间传值
## 父传子
father.html
```
document.getElementsByTagName('iframe')[0].contentWindow.postMessage('父传子数据', '*')
```
son.html
```
window.addEventListener('message', function(e) {
  console.log(e.origin) //消息来源
  console.log(e.data)
})
```

## 子传父
father.html
```
window.addEventListener('message', function(e) {
  console.log(e.origin) //消息来源
  console.log(e.data)
})

```
son.html
```
window.parent.postMessage('子传父数据', '*')
```