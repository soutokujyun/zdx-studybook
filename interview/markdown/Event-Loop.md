# Event Loop
## 是什么
E-L是一个JS的执行模型。

## 宏任务和微任务
### 宏任务 macrotask
以下异步任务回调依次进入宏任务队列：
* setTimeout
* setInterval
* reuestAnimationFrame
* I/O
* UI Rendering

### 微任务 microtask
以下异步任务回调依次进入微任务队列：
* Promise
* Object.observe
* MutationObserver

## 浏览器端的事件循环
1. 执行全局script同步代码（同步语句和异步语句setTimeout等）；
2. 全局script执行完成，调用栈为空；
3. 将目前微任务队列的任务依次取出执行，(先执行再取下一个)，直到队列为空，
    如果在执行微任务队列任务过程中又产生了微任务，则将微任务放到当前队列的末尾
    此时新的微任务会在这个周期被执行；
4. 微任务队列执行完毕，（如果有UI Rendering，就先执行）取出宏任务队列中的一个
    宏任务执行，执行完毕，调用栈为空；
5. 重复3-5的步骤。

## 总结
1. script标签里的代码肯定是最早执行的。
2. 一次事件循环只会执行 一个宏任务 和 执行当前微任务队列所有任务。