const logTime = (name) => {
    console.log(`Log__${name}  ` + new Date().toLocaleTimeString());
}

exports.callback = () => {
    setTimeout(() => {
        logTime('callback 01');
        setTimeout(() => {
            logTime('callback 02');
        })
    }, 100);
}


// 为了防止回调地狱
// 1.Promise方法
const promise = (name, delay = 100) => new Promise(resolve => {
    setTimeout(() => {
        logTime(name);
        resolve();
    }, delay);
});

exports.promise = () => {
    promise('promise01')
        .then(promise('promise02'))
        .then(promise('promise03'))
}

// 2.Generator
exports.generator = () => {
    const generator = function* (name) {
        yield promise(name + 1)
        yield promise(name + 2)
        yield promise(name + 3)
    }
    let co = generator => {
        if (it = generator.next().value) {
            it.then(res => {
                co(generator)
            })
        } else {
            return
        }
    }
    co(generator('Co-Generator'))
}

// 3.asyncAwait --最好的方式
exports.asyncAwait = async() => {
    await promise('Async/Await 1')
    await promise('Async/Await 2')
    await promise('Async/Await 3')
    await promise('Async/Await 4')
}

// 4.事件监听方式处理
exports.asyncEvent = async() => {
    const asyncFunc = name => event => {
        setTimeout(()=>{
            logTime(name)
            event.emit('end')
        }, 100)
        return event
    }

    const ary = [
        asyncFunc('event 1'),
        asyncFunc('event 2'),
        asyncFunc('event 3'),
    ]

    const { EventEmitter } = require('events')
    const event = new EventEmitter()
    let i = 0
    event.on('end', () => i < ary.length && ary[i++](event))
    event.emit('end')
}