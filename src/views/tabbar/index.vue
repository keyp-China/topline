<template>
  <div>
    <!-- 路由出口 -->
    <router-view />

    <!-- 底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">{{ $store.state.user ? '我的' : '未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabbarIndex'
}
</script>

<style>
</style>
