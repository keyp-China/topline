import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.less' // 导入全局样式

import '@/utils/vant' // vant提取

import '@/utils/veeValidate' // vee-validate校验规则

import '@/utils/day' // dayjs时间处理

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
