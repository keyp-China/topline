<template>
  <div class='home'>
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed/>

    <!-- 频道列表 带切换动画和滑动切换-->
    <van-tabs v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="channel.pullRefreshLoading" @refresh="onRefresh">
          <!-- 文章列表 带下拉加载-->
          <van-list
            v-model="channel.loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 单元格渲染文章详情 -->
            <van-cell
              v-for="(article,index) in channel.articles"
              :key="index"
              :title="article.title"
            >
              <div slot="label">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in article.cover.images" :key="index">
                    <van-image height="80" :src="img" lazy-load />
                  </van-grid-item>
                </van-grid>
                <div class="article-info">
                  <div class="meta">
                    <span>{{ article.aut_name }}</span>
                    <span>{{ article.comm_count }}评论</span>
                    <span>{{ article.pubdate | relativeTime }}</span>
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
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
    // 下拉刷新加载文章数据
    async onRefresh () {
      const channel = this.channels[this.active]
      // 1.发送获取文章请求
      const { data } = await getArticles({
        channelId: channel.id,
        timestamp: Date.now(),
        withTop: 1
      })
      // 2.将文章放入频道中
      channel.articles.unshift(...data.results)
      // 3.加载状态结束
      channel.pullRefreshLoading = false
      // 4.提示刷新成功
      this.$toast('刷新成功')
    },

    // 上划加载文章数据
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
        channel.pullRefreshLoading = false // 下拉刷新状态
      })
      this.channels = data.channels
    }
  },

  created () {
    this.loadChannels()
  }
}
</script>

<style lang='less' scoped>
.home {
  // 文章详情
  .article-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .meta span {
      margin-right: 10px;
    }
  }

  // 频道导航样式
  .van-tabs /deep/ .van-tabs__wrap--scrollable {
    position: fixed;
    top: 46px;
    left: 0;
    right: 16px;
    z-index: 2;
  }
  .van-tabs /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
</style>
