import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/cachebox1',
    children: [
      {
        path: 'cachebox1',
        meta: {
          title: '缓存盒子1'
        },
        name: 'CacheBox1',
        component: () => import('@/views/CacheBox/index.vue')
      },
      {
        path: 'cachebox2',
        meta: {
          title: '缓存盒子2'
        },
        name: 'CacheBox2',
        component: () => import('@/views/CacheBox/index.vue')
      }
    ]
  }
]
// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
