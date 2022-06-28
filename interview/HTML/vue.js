let TRAGET = null;
const utils = {
    getValue(expr, vm) {
        return vm.$data[expr.trim()] 
    },
    setValue(expr, vm, value) {
        vm.$data[expr.trim()] = value
    },
    model(node, value, vm) {
        const initValue = this.getValue(value, vm)
        this.modelUpdater(node, initValue)
        new Watcher(value, vm, (newValue) => {
            this.modelUpdater(node, newValue)
        })
        node.addEventListener('input', (e) => {
            this.setValue(value, vm, e.target.value)
        })
    },
    text(node, value, vm) {
        // {{ msg }} v-text="msg"
        let initValue
        if (value.includes("{{")) {
            // {{ msg }} => msg
            initValue = value.replace(/{{(.+)}}/g, (...args) => {
                const expr = args[1]
                new Watcher(expr, vm, (newValue) => {
                    this.textUpdater(node, newValue)
                })
                return this.getValue(expr, vm)
            })
        } else {
            // v-text
            new Watcher(value, vm, (newValue) => {
                this.textUpdater(node, newValue)
            })
            initValue = this.getValue(value, vm)
        }
        this.textUpdater(node, initValue)
    },
    modelUpdater(node, value) {
        node.value = value
    },
    textUpdater(node, value) {
        node.textContent = value
    }
}

class Watcher {
    constructor(expr, vm, cb) {
        this.expr = expr
        this.vm = vm
        this.cb = cb

        this.oldValue = this.getOldValue()
    }

    getOldValue() {
        TRAGET = this
        const oldValue = utils.getValue(this.expr, this.vm)
        TRAGET = null
        return oldValue
    }

    update() {
        const newValue = utils.getValue(this.expr, this.vm)
        if (newValue != this.oldValue) {
            this.cb(newValue)
        }
    }
}

class Dep {
    constructor() {
        this.collect = []
    }

    addWatcher(watcher) {
        this.collect.push(watcher)
    }

    notify() {
        this.collect.forEach(w => w.update())
    }
}

class Observer {
    constructor(data) {
        this.observe(data)
    }

    observe(data) {
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }

    defineReactive(obj, key, val) {
        this.observe(val)
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            get() {
                TRAGET && dep.addWatcher(TRAGET)
                return val
            },
            set(newVal) {
                if (newVal == val) return
                val = newVal
                dep.notify()
            }
        })
    }
}

class Complier {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm

        const fragment = this.compileFragment(this.el)
        this.complier(fragment)

        this.el.appendChild(fragment)
    }

    complier(node) {
        const childNodes = Array.from(node.childNodes)
        childNodes.forEach(childNode => {
            if (this.isElementNode(childNode)) {
                // h1 / input
                this.compileElement(childNode)
            } else if (this.isTextNode(childNode)) {
                //  {{ msg }}
                this.complieText(childNode)
            }
            if (childNode.childNodes && childNode.childNodes.length) {
                this.complier(childNode)
            }
        })
    }

    compileFragment(node) {
        const f = document.createDocumentFragment()
        let firstChild
        while (firstChild = node.firstChild) {
            f.appendChild(firstChild)
        }
        return f
    }

    compileElement(node) {
        const attributes = Array.from(node.attributes)
        attributes.forEach(attr => {
            const { name, value } = attr
            if (this.isDirector(name)) {
                // v-model v-text v-on:click
                const [, directive] = name.split('-')
                const [directiveName, eventName] = directive.split(':')
                utils[directiveName](node, value, this.vm, eventName)
            }
        })
    }

    complieText(node) {
        // {{ msg }}
        const content = node.textContent
        if (/\{\{(.+)\}\}/.test(content)) {
            utils['text'](node, content, this.vm)
        }
    }

    isDirector(name) {
        return name.startsWith('v-')
    }

    isElementNode(node) {
        return node.nodeType == 1
    }

    isTextNode(node) {
        return node.nodeType == 3
    }
}

class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        this.$options = options

        new Observer(this.$data)

        new Complier(this.$el, this)

        // vm.$data.xx => vm.xx
        this.proxyData(this.$data)
    }

    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newValue) {
                    data[key] = newValue
                }
            })
        })
    }
}