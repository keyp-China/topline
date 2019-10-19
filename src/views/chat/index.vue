<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar title="智能机器人" left-arrow @click-left="$router.back()" fixed />
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <div
        class="message-item"
        :class="{ reverse: item.isMe }"
        v-for="(item,index) in messages"
        :key="index"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          width="30"
          height="30"
          :src="item.photo"
        />
        <div class="title">
          <span>{{ item.message }}</span>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model="message" center clearable>
        <van-button slot="button" size="small" type="primary" @click="onSendMessage">发送</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'

export default {
  data () {
    return {
      message: '',
      socket: null,
      // [ { message: '消息数据', isMe: true, photo: '头像' }, ]
      messages: getItem('chat-message') || [] // 存储所有的消息列表
    }
  },

  created () {
    // 建立连接
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket

    // 当客户端与服务器建立连接成功，触发 connect 事件
    socket.on('connect', () => {})

    socket.on('message', data => {
      this.messages.push({
        message: data.msg,
        isMe: false,
        photo: 'http://toutiao.meiduo.site/FtyZJDTPBFAVEPB7FwBB6Cg9y71F'
      })
    })
  },

  mounted () {
    // 让列表滚动到最底部
    const messageList = this.$refs['message-list']
    messageList.scrollTop = messageList.scrollHeight
  },

  watch: {
    messages (newValue) {
      setItem('chat-message', newValue)

      // 让列表滚动到最底部
      const messageList = this.$refs['message-list']

      // 这里需要把操作 DOM 的这个代码放到 $nextTick 中
      // 为啥？明天再说
      this.$nextTick(() => {
        messageList.scrollTop = messageList.scrollHeight
      })
    }

  },

  methods: {
    /**
     * 发送按钮
     */
    onSendMessage () {
      const message = this.message.trim()
      if (!message) {
        return
      }
      // 发送消息
      this.socket.emit('message', {
        msg: message,
        timestamp: Date.now()
      })

      // 把消息存储到数组中
      this.messages.push({
        message,
        isMe: true,
        photo: 'https://img.yzcdn.cn/vant/cat.jpeg'
      })

      // 清空文本框
      this.message = ''
    }
  }
}
</script>

<style scoped lang='less'>
.chat-container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 46px 0 50px 0;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: #f5f5f6;
  .message-list {
    height: 100%;
    overflow-y: scroll;
    .message-item {
      display: flex;
      align-items: center;
      padding: 10px;
      .title {
        background: #fff;
        padding: 5px;
        border-radius: 6px;
      }
      .avatar {
        margin-right: 5px;
      }
    }
    .reverse {
      flex-direction: row-reverse;
      .title {
        margin-right: 5px;
      }
    }
  }

  .send-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f5f5f6 !important;
  }
}
</style>
