import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
let modulesFiles = null
let modules = {}
if (import.meta.env.VITE_KEY == 'vite') {
  modulesFiles = import.meta.globEager('./modules/**/*.js')
  // eslint-disable-next-line no-unused-vars
  Object.keys(modulesFiles).forEach(modulePath => {
    const moduleName = modulePath.replace(/^\.\/.*\/(.*)\.\w+$/, '$1')
    const value = modulesFiles[modulePath]
    modules[moduleName] = value.default
  })
} else {
  modulesFiles = require.context('./modules', true, /\.js$/)

  // you do not need `import app from './modules/app'`
  // it will auto require all vuex module from modules file
  modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})
}

export default new Vuex.Store({
  modules,
  // getters
})
