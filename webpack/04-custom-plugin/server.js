const fs = require("fs");
const path = require("path");

fs.readFile("./dist/fileList.txt", (err, data) => {
    if (err) {
        return console.error(err);
    }
    const size = Buffer.byteLength(data.toString(), "utf8");
    console.log(size);
});
