<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 文章列表 -->
        <van-list v-model="channel.loading" :finished="channel.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="article in channel.articles" :key="article.art_id.toString()" :title="article.title" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  name: 'HomeIndex',

  data () {
    return {
      active: 0, // 控制当前激活的标签页
      channels: [] // 频道列表
    }
  },

  methods: {
    // 加载文章数据
    async onLoad () {
      const channel = this.channels[this.active]

      // 1.发送获取文章请求
      const { data } = await getArticles({
        channelId: channel.id,
        timestamp: channel.timestamp || Date.now(),
        withTop: 1
      })

      // 2.将文章放入频道中
      channel.articles.push(...data.results)

      // 3.加载状态结束
      channel.loading = false

      // 4.判断是否还有下一页数据
      if (data.pre_timestamp) {
        // 有则时间戳赋值
        channel.timestamp = data.pre_timestamp
      } else {
        // 没有则数据全部加载完成
        channel.finished = true
      }
    },

    // 获取用户默认的频道列表
    async loadChannels () {
      const { data } = await getChannels()
      data.channels.forEach(channel => {
        channel.articles = [] // 频道的文章列表
        channel.loading = false // 频道的上拉加载更多的 loading 状态
        channel.finished = false // 频道的加载结束的状态
        channel.timestamp = null // 时间戳
      })
      this.channels = data.channels
    }
  },

  created () {
    this.loadChannels()
  }
}
</script>

<style>
</style>
