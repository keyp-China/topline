<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <van-button
        round
        type="info"
        slot="title"
        size="small"
        class="searchBtn"
        icon="search"
        @click="$router.push('/search')"
      >搜索</van-button>
    </van-nav-bar>

    <!-- 频道列表 带切换动画和滑动切换-->
    <van-tabs v-model="active" animated swipeable>
      <!-- 面包按钮 -->
      <div slot="nav-right" class="wap-nav" @click="isPopupShow = true">
        <van-icon name="wap-nav" size="24" />
      </div>
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
              @click="$router.push({
                name: 'article',
                params: {
                  articleId: article.art_id.toString()
                }
              })"
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
    <!-- 频道操作弹出层 -->
    <van-popup
      class="channel-container"
      v-model="isPopupShow"
      round
      position="bottom"
      :style="{ height: '90%' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- 我的频道 -->
      <div>
        <van-cell title="我的频道">
          <van-button type="danger" size="mini" @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
        </van-cell>
        <van-grid :gutter="10">
          <van-grid-item
            v-for="(channel,index) in channels"
            :key="index"
            :text="channel.name"
            @click="clickMyChannel(index)"
          >
            <van-icon
              v-show="isEdit"
              v-if="channel.id!=0"
              class="close-icon"
              slot="icon"
              name="close"
            />
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 频道推荐 -->
      <div>
        <van-cell title="频道推荐"></van-cell>
        <van-grid :gutter="10">
          <van-grid-item
            v-for="(channel,index) in getRecommendedChannels"
            :key="index"
            :text="channel.name"
            @click="clickRecommended(channel)"
          />
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getChannels, getAllChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  name: 'HomeIndex',

  data () {
    return {
      active: 0, // 控制当前激活的标签页
      channels: [], // 我的频道列表
      isPopupShow: false, // 频道弹出层是否显示
      channelsAll: [], // 全部的频道列表
      isEdit: false // 是否编辑模式
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
      const channels = data.channels
      // 添加默认数据
      this.extendData(channels)
      this.channels = channels
    },

    // 获取全部的频道列表
    async getAllChannels () {
      const { data } = await getAllChannels()
      const channels = data.channels
      // 添加默认数据
      this.extendData(channels)
      this.channelsAll = channels
    },

    // 点击推荐频道
    clickRecommended (channel) {
      this.channels.push(channel)
    },

    // 点击我的频道
    clickMyChannel (index) {
      if (this.isEdit) {
        if (index === 0) {
          // 推荐不可删除
          return
        }
        // 删除我的频道
        this.channels.splice(index, 1)
      } else {
        this.active = index // 跳转到点击频道
        this.isPopupShow = false // 弹出层取消展示
      }
    },

    // 数据拓展
    extendData (channels) {
      channels.forEach(channel => {
        channel.articles = [] // 频道的文章列表
        channel.loading = false // 频道的上拉加载更多的 loading 状态
        channel.finished = false // 频道的加载结束的状态
        channel.timestamp = null // 时间戳
        channel.pullRefreshLoading = false // 下拉刷新状态
      })
    }
  },

  computed: {
    // 获取剩余的推荐频道
    getRecommendedChannels () {
      const channels = []
      this.channelsAll.forEach(channel => {
        const index = this.channels.findIndex(item => item.id === channel.id)
        if (index === -1) {
          channels.push(channel)
        }
      })
      return channels
    }
  },

  created () {
    this.loadChannels()
    this.getAllChannels()
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

  // 搜索按钮
  .searchBtn {
    width: 100%;
    .van-icon {
      color: #fff;
    }
  }

  // 频道导航样式
  .van-tabs {
    /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
      left: 0;
      right: 16px;
      z-index: 2;
    }
    /deep/ .van-tabs__content {
      margin-top: 90px;
      margin-bottom: 50px;
    }
  }

  //面包按钮
  .wap-nav {
    position: sticky;
    right: 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    opacity: 0.8;
  }

  // 频道弹窗样式
  .channel-container {
    padding-top: 30px;
    .close-icon {
      position: absolute;
      top: -5px;
      right: -5px;
    }
  }
}

// close图标
.close-icon {
  position: absolute;
  top: -5px;
  right: -5px;
}
</style>
