<template>
  <div class="serach-result">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.params.q + '的搜索结果'" left-arrow fixed @click-left="$router.back()" />
    <!-- /导航栏 -->

    <!-- 文章列表 -->
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in searchResultList" :key="index" :title="item.title" />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getSearch } from '@/api/search'

export default {
  name: 'SearchResult',
  data () {
    return {
      searchResultList: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },

  methods: {
    async onLoad () {
      // 1.获取数据
      const { data } = await getSearch({
        page: this.page,
        per_page: this.perPage,
        q: this.$route.params.q
      })
      // 2.数据加载到数组中
      this.searchResultList.push(...data.results)
      // 3.加载状态结束
      this.loading = false
      // 4.判断是否还有数据
      if (data.page) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.serach-result {
  .article-list {
    margin-top: 46px;
  }
}
</style>
