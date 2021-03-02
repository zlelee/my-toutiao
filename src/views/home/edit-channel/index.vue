<template>
  <div class="channel-edit">
    <!-- 我的频道标题 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini"
        @click="isShowClear = !isShowClear">编辑</van-button
      >
    </van-cell>
    <!-- 我的频道内容 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="editMyChannel(channel,index)"
      >
      <van-icon slot="icon" name="clear" v-show="isShowClear && !requiredChannel.includes(channel.id)"></van-icon>
      <span slot="text" class="text" :class="{active: active === index}">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐标题 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 频道推荐内容 -->
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="addToMyChannels(channel)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel-list'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'editChannel',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isShowClear: false,
      requiredChannel: [0]
    }
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        console.log(err)
      }
    },
    async addToMyChannels(channel) {
      this.myChannels.push(channel)
      if (this.tokenObj) {
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          const i = this.myChannels.findIndex(item => item.id === channel.id)
          this.myChannels.splice(i, 1)
          this.$toast('添加频道失败,请稍后再试')
        }
      } else {
        // 用户未登录
        setItem('user_channels', this.myChannels)
      }
    },
    editMyChannel(channel, index) {
      if (this.isShowClear) {
        // 删除频道
        if (this.requiredChannel.includes(channel.id)) {
          return // 不能删除的频道
        }
        if (this.active >= index) {
          this.$emit('clickChannel', this.active - 1)
        }
        this.myChannels.splice(index, 1)
        this.deleteMyChannle(channel)
      } else {
        this.$emit('clickChannel', index, false)
      }
    },
    async deleteMyChannle(channel) {
      if (this.tokenObj) {
        // 登录状态下
        try {
          await deleteUserChannel(channel.id)
        } catch (err) {
          this.$toast('删除频道失败')
        }
      } else {
        // 未登录状态
        setItem('user_channels', this.myChannels)
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(item => item.id === channel.id)
      })
    },
    ...mapState(['tokenObj'])
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  // 编辑按钮
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
