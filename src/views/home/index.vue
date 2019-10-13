<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 文章列表 -->
        <van-list v-model="channel.loading" :finished="channel.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in channel.articles" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channels'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  methods: {
    onLoad () {
      const channel = this.channels[this.active]
      // 异步更新数据
      setTimeout(() => {
        console.log('load....')

        for (let i = 0; i < 10; i++) {
          channel.articles.push(channel.articles.length + 1 + channel.name)
        }
        // 加载状态结束
        channel.loading = false

        // 数据全部加载完成
        if (channel.articles.length >= 40) {
          channel.finished = true
        }
      }, 1000)
    },

    // 获取用户默认推荐的频道列表
    async getChannels () {
      const { data } = await getChannels()
      data.channels.forEach(channel => {
        channel.articles = [] // 频道的文章列表
        channel.loading = false // 频道的上拉加载更多的 loading 状态
        channel.finished = false // 频道的加载结束的状态
      })
      this.channels = data.channels
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
