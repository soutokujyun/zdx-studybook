import router from '@/router'
import Axios from 'axios'
router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(() => {
  if (process.env.NODE_ENV === 'production') {
    Axios.get('./version.json?date=' + Date.now()).then(res => {
      if (res.data.version !== String(process.env.VUE_APP_VERSION)) {
        console.log('版本不一致')
        // MessageBox.alert('版本不一致，点击确定刷新页面！', '提示', {
        //   showClose: false,
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     window.location.reload(true)
        //   }
        // })
      }
    })
  }
})