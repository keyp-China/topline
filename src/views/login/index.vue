<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />

    <!-- 登录表单 -->
    <ValidationObserver ref="loginForm">
      <!-- 输入框 -->
      <van-cell-group>
        <!--  ValidationProvider
          name 提示的文本
          rules 验证规则
          v-slot="{ errors }" 获取校验结果数据
          errors[0] 读取校验结果的失败信息
        -->
        <ValidationProvider name="手机号" rules="required|phone" v-slot="{ errors }">
          <van-field
            v-model="user.mobile"
            label="手机号"
            placeholder="请输入手机号"
            required
            clearable
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required|max:6" v-slot="{ errors }">
          <van-field
            v-model="user.code"
            label="验证码"
            placeholder="请输入验证码"
            type="password"
            required
            clearable
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>

    <!-- 按钮 -->
    <div class="btn-wrap">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      }
    }
  },
  methods: {
    // 登录
    async onLogin () {
      // 表单验证
      const isValid = await this.$refs.loginForm.validate()
      // 如果验证失败，阻止表单提交
      if (!isValid) {
        return
      }
      // 登录loading
      // const toast = this.$toast.loading({
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '登录中'
      })
      try {
        const { data } = await login(this.user)
        // toast.clear() // 清楚loading
        console.log(data)
        this.$toast.success('登录成功')
      } catch (err) {
        // toast.clear() // 清楚loading
        this.$toast.fail('手机号或者验证码错误')
      }
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
