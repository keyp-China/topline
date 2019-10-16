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
    <van-cell-group v-if="searchValue">
      <van-cell
        icon="search"
        v-for="(item,index) in suggestionList"
        :key="index"
        @click="clickSuggestion(item)"
      >
        <div slot="title" v-html="highLight(item)"></div>
      </van-cell>
    </van-cell-group>

    <!-- 搜索记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isDelete">
          <span @click="searchHistory=[]">全部删除</span>&nbsp;&nbsp;&nbsp;
          <span @click="isDelete = false">完成</span>
        </template>
        <van-icon name="delete" @click="isDelete = true" v-else />
      </van-cell>
      <van-cell
        :title="item"
        v-for=" (item,index) in searchHistory"
        :key="index"
        @click="clickHistory(item)"
      >
        <van-icon name="close" v-show="isDelete" @click.stop="searchHistory.splice(index,1)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { searchSuggestion } from '@/api/search'
import { getItem, setItem } from '@/utils/storage'
import { debounce } from 'lodash'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchValue: '', // 搜索值
      suggestionList: [], // 联想建议
      isDelete: false, // 是否删除状态
      searchHistory: getItem('search_history') || [] // 搜索历史记录
    }
  },
  watch: {
    searchHistory (newVal) {
      // 本地化存储
      setItem('search_history', newVal)
    }
  },
  methods: {
    // 搜索
    onSearch () {
      // 判断搜索内容是否为空
      if (this.searchValue.trim()) {
        // 本次搜索是否在搜索记录中
        const index = this.searchHistory.indexOf(this.searchValue)
        if (index !== -1) {
          // 在记录中则删除
          this.searchHistory.splice(index, 1)
        }
        // 将本次搜索添加到历史记录中
        this.searchHistory.unshift(this.searchValue)
        // 本地化存储(watch这里不起作用 因为下面路由跳转后watch还没触发)
        setItem('search_history', this.searchHistory)
        // 路由跳转
        this.$router.push(`/search/${this.searchValue}`)
      }
    },

    // 点击历史记录跳转
    clickHistory (item) {
      this.searchValue = item
      this.onSearch()
    },

    // 联想记录查询
    // async searchSuggestion () {
    searchSuggestion: debounce(async function () {
      if (this.searchValue.trim()) {
        const { data } = await searchSuggestion({ q: this.searchValue })
        this.suggestionList = data.options
      } else {
        this.suggestionList = []
      }
    }, 500),

    // 高亮数据展示
    highLight (item) {
      // 匹配正则
      const re = new RegExp(this.searchValue, 'g')
      // 给文本添加高亮
      const sty = `<span style='color:red'>${this.searchValue}</span>`
      // 替换
      return item.replace(re, sty)
    },

    // 点击联想建议
    clickSuggestion (item) {
      this.searchValue = item
      this.onSearch()
    }
  }
}
</script>

<style>
</style>
