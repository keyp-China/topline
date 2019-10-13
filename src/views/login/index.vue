<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />

    <!-- 输入框 -->
    <van-cell-group>
      <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号" required />
      <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" type="password" required />
    </van-cell-group>

    <!-- 按钮 -->
    <div class="btn-wrap">
      <van-button type="info" @click="doLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    // 登录
    doLogin () {
      request({
        url: '/app/v1_0/authorizations',
        method: 'post',
        data: this.user
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  .btn-wrap {
    padding: 20px;
    .van-button {
      border-radius: 8px;
      width: 100%;
      background-color: #6db4fb;
    }
  }
}
</style>
