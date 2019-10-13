import Vue from 'vue'
import Vuex from 'vuex'
import { getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化时从本地存储中获取user的值
    user: getItem('user')
  },
  mutations: {
    // 设置user
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {

  }
})
