class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(type, callback) {
        if (!this.events[type]) {
            this.events[type] = [callback]
        } else {
            this.events[type].push(callback)
        }
    }

    once(type, callback) {
        function fn() {
            callback()
            this.off(type, fn)
        }
        this.on(type, fn)
    }

    emit(type, ...rest) {
        this.events[type] && this.events[type].forEach(event => {
            event.apply(null, rest)
        });
    }

    off(type, callback) {
        if (!this.events[type]) return
        if (!callback) return Reflect.deleteProperty(this.events, type)
        this.events[type] = this.events[type].filter(event => event !== callback)
    }

}


const emitter = new EventEmitter()
// 订阅
let fn1 = () => {
    console.log('fn1')
}
emitter.on('doAction', fn1)
let fn2 = () => {
    console.log('fn2')
}
emitter.on('doAction', fn2)

// 发布
emitter.emit('doAction')

// 销毁
emitter.off('doAction', fn1)

emitter.emit('doAction')