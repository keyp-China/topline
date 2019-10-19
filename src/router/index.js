import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 首页
      component: () => import('@/views/tabbar'),
      children: [
        {
          path: '', // 默认子路由
          component: () => import('@/views/home')
        },
        {
          path: '/mine', // 我的
          component: () => import('@/views/mine')
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
    },
    {
      name: 'search-result', // 搜索结果
      path: '/search/:q',
      component: () => import('@/views/search-result')
    },
    {
      name: 'article', // 文章详情
      path: '/article/:articleId',
      component: () => import('@/views/article')
    },
    {
      name: 'user', // 个人信息
      path: '/user',
      component: () => import('@/views/user')
    }
  ]
})
