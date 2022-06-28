// test('Callback 测试', done => {
//     const {callback} = require("../index");
//     callback();
//     // done执行才结束，不然会直接结束
//     setTimeout(done, 1000)
// })

// test('Promise 测试', done => {
//     const {promise} = require("../index");
//     promise();
//     // done执行才结束，不然会直接结束
//     setTimeout(done, 1000)
// })

// test('Promise 测试', done => {
//     const {generator} = require("../index");
//     generator();
//     // done执行才结束，不然会直接结束
//     setTimeout(done, 1000)
// })

test('Async/Await 测试', done => {
    const {asyncAwait} = require("../index");
    asyncAwait();
    // done执行才结束，不然会直接结束
    setTimeout(done, 1000)
})

// test('Event 测试', done => {
//     const {asyncEvent} = require("../index");
//     asyncEvent();
//     // done执行才结束，不然会直接结束
//     setTimeout(done, 1000)
// })