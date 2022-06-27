const utils = {
    getValue(expr, vm) {
        return vm.$data[expr.trim()] 
    },
    model(node, value, vm) {
        const initValue = this.getValue(value, vm)
        this.modelUpdater(node, initValue)
    },
    text(node, value, vm) {
        // {{ msg }} v-text="msg"
        let initValue
        if (value.includes("{{")) {
            // {{ msg }} => msg
            initValue = value.replace(/{{(.+)}}/g, (...args) => {
                const expr = args[1]
                return this.getValue(expr, vm)
            })
        } else {
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
        Object.defineProperty(obj, key, {
            get() {
                console.log(`get ${key}: ${val}`)
                return val
            },
            set(newVal) {
                if (newVal == val) return
                console.log(`set ${key}: ${newVal}`)
                val = newVal
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