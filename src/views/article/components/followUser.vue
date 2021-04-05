<template>
  <div class="follow-user">
    <van-button
            v-if="!isFollowed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="btnLoading"
            @click="onFollow"
          >关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            round
            size="small"
            :loading="btnLoading"
            @click="onFollow"
          >已关注</van-button>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: '',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      btnLoading: false
    }
  },

  methods: {
    async onFollow() {
      this.btnLoading = true
      try {
        if (this.isFollowed) {
        // 已经关注了, 取消关注
          await deleteFollow(this.autId)
          this.$toast.success('取消关注成功')
        } else {
        // 没有关注, 关注用户
          await addFollow(this.autId)
          this.$toast.success('关注成功')
        }
        // 更新视图
        this.$emit('update-isFollowed', !this.isFollowed)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          return this.$toast.fail('不能关注自己')
        }
        this.$toast.fail('操作失败')
      }
      // 关闭加载状态
      this.btnLoading = false
    }
  }
}
</script>

<style lang='less' scoped>

</style>
