# uniapp开发小程序

## NVue是什么
uni-app App端内置了一个基于weex改进的原生渲染引擎，提供了原生渲染能力。  
在App端，如果使用vue页面，则使用webview渲染；如果使用nvue页面（native vue的缩写），则使用原生渲染。一个App中可以同时使用两种页面，比如首页使用nvue，二级页面使用vuey页面。  
虽然nvue也可以多端编译，输出H5和小程序，但nvue的css写法受限，所以如果不开发APP，那么不需要使用nvue。

## 怎么推广小程序
1. 到掘金一些问题平台回答问题
2. 到小程序商店发布： 知晓程序、小程序大梦想

## 实战
1. 从相册或拍照选取一张图片，并显示到页面里
```
uni.chooseImage({
    count:1,
    success: (res) => {
        this.imagepath = res.tempFilePaths;
        this.image2base64();
    }
})
```
2. 把图片转成base64编码
```
image2base64(){
    // #ifdef APP-PLUS
    // 原生APP
    //html5 +  plus
    plus.io.resolveLocalFileSystemURL(this.imagepath,(entry)=>{
        entry.file((file)=>{
            let reader = new plus.io.FileReader();
            reader.onloadend=(e)=>{
                console.log(e.target.result);
                const base64 = e.target.result.substr(22);
                this.imageClassify(base64);
            }
            reader.readAsDataURL(file);
        })
    })
    // #endif
    if
    uni.getFileSystemManager().readFile({
        filePath:this.imagepath,
        encoding:"base64",
        success:(res)=>{
            console.log(res);
            this.imageClassify(res.result.result);
        }
    });
},
```
3. 调用百度AI接口识别主题内容
```
async imageClassify(b64){
    let [error, res] = await uni.request({
        url:"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=Va5yQRHlA4Fq5eR3LT0vuXV4&client_secret=0rDSjzQ20XUj5itV6WRtznPQSzr5pVw2&",
        method:"POST",
    });
    
    let access_token  =res.data.access_token;
    
    let [error2, res2] = await uni.request({
        url:"https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general",
        method:"POST",
        header:{
            "Content-Type": "application/x-www-form-urlcode"
        },
        data:{
            access_token: access_token,
            image: b64,
        }
    })
    this.parseResult(res2);
},
```
4. 展示结果
```
parseResult(result){
    this.recResult = result;
    
    let itemList = [];
    let abs_result_index;
    
    for(let i = 0; i<result.length; i++){
        if(reuslt[i].score>.7){
            abs_result_index=i;
            break;
        }
        itemList.push(result[i].keyword+""+result[i].score);
    }
    
    if(abs_result_index>=0){
        console.log(this.recResult[abs_result_index].keyword);
        return;
    }
    uni.showActionSheet({
        itemList:itemList,
        success: (res) => {
            if(res.tapIndex){
                console.log(itemList[res.tapIndex])
            }
        }
    })
}
```
## uni-cloud云开发
3. 调用百度AI接口识别主题内容(将请求内容改写到云函数里)
```
// /cloudfunctions/iamgeClassify/index.js
exports.main = async (event, context) => {
    const res = await uniCloud.httpclient.request("获取tokenAPI",{
        dataType: "json"
    });
    const access_token = res.data.access_token;

    const classify_res = await uniCloud.httpclient.request(
        "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general",
        {
            method:"POST",
            dataType:"json",
            header:{
                "Content-Type": "application/x-www-form-urlcode"
            },
            data:{
                access_token: access_token,
                image: event.image,
            }
        }
    )
    return classify_res.data;
}

// pages/index/index.js
async imageClassify(b64){
    uniCloud.callFunction({
        name:"ImageClassify",
        data:{
            image: b64
        }
    })
},
```