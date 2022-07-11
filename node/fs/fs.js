const fs = require('fs')
const fsp = fs.promises

// 同步调用
const data = fs.readFileSync('./image.jpg')
console.log(data)

// 异步调用
fs.readFile('./image.jpg', (err, data)=> {
    if (err) throw err
    console.log(data)
})

// promisify
fsp.readFile('./image.jpg')
    .then((data) => {
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })