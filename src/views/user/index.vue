<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow right-text="保存" @click-right="onSave" />
    <van-cell-group>
      <van-cell title="头像" is-link @click="onChangePhoto">
        <van-image round width="30" height="30" :src="user.photo" />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link @click="isEditNameShow = true" />
      <van-cell
        title="性别"
        :value="user.gender ? '女': '男' "
        is-link
        @click="isEditGenderShow = true"
      />
      <van-cell title="生日" :value="user.birthday" is-link @click="isEditBirthdayShow = true" />
    </van-cell-group>

    <!-- 上传头像文件 隐藏 -->
    <input type="file" hidden ref="photoFile" @change="onPhotoFile" />

    <!-- 编辑用户昵称弹窗 -->
    <van-dialog
      v-model="isEditNameShow"
      title="用户昵称"
      show-cancel-button
      @confirm="onUserNameConfirm"
    >
      <van-field placeholder="请输入用户名" :value="user.name" @input="onUserNameInput" />
    </van-dialog>

    <!-- 编辑用户昵称上拉菜单 -->
    <van-action-sheet
      v-model="isEditGenderShow"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
    />

    <!-- 编辑用户生日 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom" :style="{ height: '35%' }">
      <van-datetime-picker
        type="date"
        @confirm="onUserBirthdayConfirm"
        @cancel="isEditBirthdayShow = false"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { getProfile, updateUserPhoto, updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UserIndex',
  data () {
    return {
      user: {}, // 用户
      userName: '', // 存储编译userName的值
      isEditNameShow: false, // 昵称修改是否显示
      isEditGenderShow: false, // 性别修改是否显示
      actions: [{ name: '男', value: 0 }, { name: '女', value: 1 }],
      isEditBirthdayShow: false, // 编辑生日是否显示
      minDate: new Date(1900, 0, 1),
      maxDate: new Date()
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
        this.user.photo = window.URL.createObjectURL(
          this.$refs['photoFile'].files[0]
        )
      }
    },

    /**
     * 保存按钮点击
     */
    async onSave (data) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '保存中'
      })

      try {
        const photo = this.$refs['photoFile'].files[0]
        if (photo) {
          const fd = new FormData()
          fd.append('photo', photo)
          await updateUserPhoto(fd)
        }
        // 保存基本信息
        await updateUserProfile({
          name: this.user.name,
          gender: this.user.gender,
          birthday: this.user.birthday
        })
        this.$toast.success('保存成功')
      } catch (err) {
        this.$toast.fail('保存失败')
      }
    },

    /**
     * UserName编辑保存事件
     */
    onUserNameConfirm () {
      this.user.name = this.userName
      this.isEditNameShow = false
    },
    /**
     * UserName编辑改变事件
     */
    onUserNameInput (newName) {
      this.userName = newName
    },

    /**
     * 性别选择事件
     */
    onSelect (item) {
      this.user.gender = item.value
      this.isEditGenderShow = false
    },

    /**
     * 生日选择确定事件
     */
    onUserBirthdayConfirm (value) {
      // 更新数据
      this.user.birthday = dayjs(value).format('YYYY-MM-DD')
      // 关闭弹层
      this.isEditBirthdayShow = false
    }
  }
}
</script>
