/* Buffer缓冲区
读取数据类型为Buffer
Buffer - 用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。 八位字节组
成的数组，可以有效的在JS中存储二进制数据
*/
// 1. 创建一个长度为10字节以0填充的Buffer
const buf1 = Buffer.alloc(10)
console.log(buf1);

// 2. 创建一个Buffer包含ascii.   ascii 查询 http://ascii.911cha.com/
const buf2 = Buffer.from('a')
console.log(buf2, buf2.toString());

// 3. 创建Buffer包含UTF-8字节
const buf3 = Buffer.from('你好世界');
console.log(buf3, buf3.toString('utf-8'));

// 写入数据
buf1.write('Hello World') // 只能存10位
console.log(buf1, buf1.toString());

// 读取Buffer数据
console.log(buf2.toString())

// 合并Buffer数据
const buf4 = Buffer.concat([buf1, buf3])
console.log(buf4, buf4.toString())