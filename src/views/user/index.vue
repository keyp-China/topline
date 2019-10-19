<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow right-text="保存" />
    <van-cell-group>
      <van-cell title="头像" is-link @click="onChangePhoto">
        <van-image round width="30" height="30" :src="user.photo" />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link />
      <van-cell title="性别" :value="user.gender ? '男': '女' " is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>

    <!-- 上传头像文件 隐藏 -->
    <input type="file" hidden ref="photoFile" @change="onPhotoFile" />
  </div>
</template>

<script>
import { getProfile } from '@/api/user'

export default {
  name: 'UserIndex',
  data () {
    return {
      user: {} // 用户
    }
  },

  created () {
    this.loadUser()
  },

  methods: {
    /**
     * 加载用户
     */
    async loadUser () {
      const { data } = await getProfile()
      this.user = data
    },

    /**
     * 点击头像事件
     */
    onChangePhoto () {
      this.$refs['photoFile'].click()
    },
    /**
     * photoFile 改变事件
     */
    onPhotoFile () {
      if (this.$refs['photoFile'].files.length) {
        this.user.photo = window.URL.createObjectURL(this.$refs['photoFile'].files[0])
      }
    }

  }
}
</script>
