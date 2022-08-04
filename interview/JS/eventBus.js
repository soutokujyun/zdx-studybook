
// 使用
class eventBus {
    constructor() {
        this.events = {}
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(fn => fn.apply(this, args))
        }
    }

    on(eventName, fn) {
        if (this.events[eventName]) {
            this.events[eventName].push(fn)
        } else {
            this.events[eventName] = [fn]
        }
    }
}