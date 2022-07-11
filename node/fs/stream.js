const fs = require('fs')
const image = fs.createReadStream('./image.jpg')
const image2 = fs.createWriteStream('./image1.jpg')

image.pipe(image2)