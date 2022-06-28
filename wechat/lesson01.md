# 微信小程序

## 函数事件

-   bindTap 绑定点击事件
-   wx.navigateTo({url: ''}) 跳转到另一个页面

## 原理

分为 渲染层（webview） 和 逻辑层（JsCore）

```
// Console下
# document // 显示逻辑层

# openInspect() > Apps > inspect
# document.getElementsByTagName('webview'); // 一共3个webview
每一个页面一个webview

# openVendor();
# ls
# wcc.exe wcsc.exe ... // 这个两个是Linux执行文件
# ./wcc -d index.wxml -o index.js // 将index.wxml文件转成js可执行文件
```

## app.json

tabbar

```
"tabBar"{
    "list":[
        {
            "text":"课程1",
            "pagePath": "./lesson01/index",
        },
        {
            "text":"课程2",
            "pagePath": "./lesson02/index",
        },
    ]
}
```

## API

### 扫码识别

```
wx.scanCode({
    onlyFromCamera:true,
    success(res) {
        console.log(res);
    }
});
```

### 显示地理位置

```
// 使用地理位置需要现在app.json配置
// app.json
"permission":{
    "scope.userLocation": {
        "desc": "你的位置信息将用于小程序接口展示"
    }
}

// 获取经纬度
// index.js
wx.getLocation({
    success(res){
        console.log(res);
    }
});

// 根据经纬度获取详细位置
// index.js
wx.getLocation({
    success(res){
        // 选择一个地理位置
        wx.chooseLocation({  // openLocation 是打开一个地理位置
            latitude: res.latitude,
            longitude: res.longitud,
            success(res2) {
                console.log(res2)
            }
        })
    }
});
```

### 获得微信步数

```
wx.login({
    success(res){
        wx.getWeRunData({
            success:(result)=>{
                wx.request({
                    url:'服务器地址',
                    data:{
                        code: code,
                        iv: result.iv,
                        encrypteddata:result.encryptedData
                    }
                    method:"POST",
                    success(res2){
                        console.log(res2);
                    }
                })
            }
        })
    }
});
```

## 云开发

### 云函数调用

```
wx.cloud.callFunction({
    name:"sum",
    data:{
        a:1,
        b:2
    },
    success(res){
        console.log(res);
    }
});
```

### 微信步数获取

```
// 创建云函数
// index.js
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();

    const {werundata} = event;
    return werundata;
}
// /pages/index/index.js
wx.getWeRunData({
    success: (result) => {
        wx.cloud.callFunction({
            name:"getwerun",
            data:{
                werundata:wx.cloud.CloudID(result.cloudID)
            },
            success(res){
                console.log(res);
            }
        });
    }
})
```

### 扫码识书

```
/pages/scan/index.js
wx.scanCode({
    onlyFromCamera:true,
    success(res) {
        console.log(res);
        wx.cloud.callFunction({
            name:"getbook",
            data:{
                isbn:res.result
            },
            success(res2){
                console.log(res2);
            }
        })
    }
});
// 云函数
// getbook/index.js
const axios = require("axios");
const doubanbook = require("doubanbook");
async function getDouBanBook(isbn) {
    const url = "https://search.douban.com/book/subject_search?search_text="+ isbn;
    let res = await axios.get(url);
    let reg = /window\.__DATA__ = "(.*)"/;
    if(reg.test(res.data)) {
        let bookdata = RegExp.$1;
        return doubanbook(bookdata)[0];
    }

}
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const isbn = event.isbn;
    let res = await getDouBanBook(isbn);

    // 数据库调用
    const db = cloud.database();
    db.collection("books").add({
        data:{
            isbn: isbn,
            title: res.title,
            coverurl: res.cover_url
        }
    });

    return {
        isbn: isbn,
        title: res.title,
        coverurl: res.cover_url
    };
}
```
