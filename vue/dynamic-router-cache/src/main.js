import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)
import './permission.js'

app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.mount('#app')
