import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible/index.js' // 动态设置 html 标签的字体大小

import '@/styles/index.less' // 导入全局样式

import '@/utils/vant' // vant提取

import '@/utils/veeValidate' // vee-validate校验规则

import '@/utils/day' // dayjs时间处理

import fastClick from 'fastclick' // 解决移动端点击 300ms 延迟
fastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
