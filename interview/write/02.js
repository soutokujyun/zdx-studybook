async function async1() {
    console.log('async1 start');
    await new Promise(resolve => {
        console.log('promise1');
    })
    console.log('async success');
    return 'async1 end'
}

console.log('script start')

async1().then(res => console.log(res))
console.log('script end')

/**
 * 错误执行顺序：
 * 
 * script start
 * async1 start
 * promise1
 * async success x
 * script end
 * async1 end x
 * 
 * 错误原因：new Promise一直处于pending状态，而
 * console.log('async success'); return 'async1 end'
 * 需要等待new Promise为fulfilled状态才能继续往下执行
 * new Promise().then() 是切换状态才会执行而这个任务是微任务
 * 需要等待所有宏任务执行完毕才会去执行。所以才会先执行cript end
 */


/**
 * 正确执行顺序：
 * 
 * script start
 * async1 start
 * promise1
 * script end
 */