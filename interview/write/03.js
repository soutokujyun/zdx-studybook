const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
})

class Scheduler {
    constructor(limit) {
        this.queue = []
        this.runCount = 0
        this.maxCount = limit || 2
    }

    add(fn) {
        return new Promise(resolve => {
            fn.resolve = resolve
            if (this.runCount < this.maxCount) {
                this.run(fn)
            } else {
                this.queue.push(fn)
            }
        })
    }
    
    run(fn) {
        this.runCount++
        fn().then(() => {
            fn.resolve()
            this.runCount--
            if (this.queue.length) {
                this.run(this.queue.shift())
            }
        })
    } 
}

const scheduler = new Scheduler()

const addTask = (time, order) => {
    scheduler.add(() => timeout(time))
        .then(() => console.log(order))
}

// 一开始1、2两个任务开始执行
// 500ms时，2任务执行完毕，输出2，任务3开始执行
// 800ms时，3任务执行完毕，输出3，任务4开始执行
// 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
// 1200ms时，4任务执行完毕，输出4

 addTask(1000,"1");
 addTask(500,"2");
 addTask(300,"3");
 addTask(400,"4");