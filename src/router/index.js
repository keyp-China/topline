import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'home' // 重定向
    },
    {
      path: '/home', // 首页
      component: () => import('@/views/tabbar'),
      children: [
        {
          path: '', // 默认子路由
          component: () => import('@/views/home')
        }
      ]
    },
    {
      name: 'login', // 登录
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      name: 'search', // 搜索
      path: '/search',
      component: () => import('@/views/search')
    }
  ]
})
