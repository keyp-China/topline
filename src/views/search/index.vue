<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!-- /搜索框 -->

    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell title="联想建议" icon="search" />
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
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchValue: ''
    }
  },

  methods: {
    onSearch () {
      console.log('onSearch')
    }
  }
}
</script>

<style>
</style>
