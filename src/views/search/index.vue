<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
      @input="searchSuggestion"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!-- /搜索框 -->

    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell icon="search" v-for="(item,index) in suggestionList" :key="index">
          <div slot="title" v-html="highLight(item)"></div>
      </van-cell>
    </van-cell-group>

    <!-- 搜索记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
          <template>
            <span>全部删除</span>&nbsp;&nbsp;&nbsp;
            <span>完成</span>
          </template>
          <van-icon name="delete" />
      </van-cell>
      <van-cell title="搜索记录">
          <van-icon name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { searchSuggestion } from '@/api/search'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchValue: '', // 搜索值
      suggestionList: [] // 联想建议
    }
  },

  methods: {
    // 搜索
    onSearch () {
      console.log('onSearch')
    },

    // 联想记录查询
    async searchSuggestion () {
      if (this.searchValue.trim()) {
        const { data } = await searchSuggestion({ q: this.searchValue })
        this.suggestionList = data.options
      } else {
        this.suggestionList = []
      }
    },

    // 高亮数据展示
    highLight (item) {
      // 匹配正则
      const re = new RegExp(this.searchValue, 'g')
      // 给文本添加高亮
      const sty = `<span style='color:red'>${this.searchValue}</span>`
      // 替换
      return item.replace(re, sty)
    }
  }
}
</script>

<style>
</style>
