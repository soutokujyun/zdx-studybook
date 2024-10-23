import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getAuth } from '@/utils/auth' // 验权
import { Message } from 'element-ui'
import axios from 'axios'
import { MessageBox } from 'element-ui'
const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  /** 请求头包含授权信息 并且 页面必须授权 直接进入 */
  const isValid = await getAuth()

  if (isValid) {
    if (to.path === '/login') {
      if (to.query.redirect) {
        next({ path: to.query.redirect })
      } else {
        next({ path: '/' })
      }
      NProgress.done()
    } else {
      const hasRoles = store.getters.allAuth && Object.keys(store.getters.allAuth).length > 0
      if (hasRoles) {
        store.dispatch('getAllUsers')
        next()
      } else {
        try {
          const auths = await store.dispatch('GetUserAuth')
          const addRouters = await store.dispatch('GenerateRoutes', auths)
          router.addRoutes(addRouters)
          if (to.path === '/404') {
            next({
              path: to.redirectedFrom || '/',
              replace: true
            })
          } else {
            next({
              ...to,
              replace: true
            })
          }
        } catch (error) {
          await store.dispatch('LogOut')
          Message.error(error || '获取用户信息失败')
          // next(`/login?redirect=${to.path}`)
          next({ path: '/login', query: { redirect: to.path }})
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则全部重定向到登录页
      if (to.redirectedFrom && to.redirectedFrom.indexOf('login') == -1) {
        next({ path: '/login', query: { redirect: to.redirectedFrom }})
      } else {
        next(`/login`) // 否则全部重定向到登录页
      }
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  const whiteList = ['/login', '/404', '/401', '/preview']

  if (!whiteList.includes(to.path)) {
    store.commit('SET_ROUTERS_HISTORY', to)

    if (process.env.NODE_ENV === 'production') {
      axios.get('./version.json?date=' + Date.now())
        .then(res => {
          if (res.data.version !== String(process.env.VUE_APP_VERSION)) {
            console.log('版本不一致')
            MessageBox.alert('版本不一致，点击确定刷新页面！', '提示', {
              showClose: false,
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload(true)
              }
            })
          }
        })
    }
  }

  NProgress.done() // 结束Progress
})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})
