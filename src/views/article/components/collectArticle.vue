<template>
  <van-icon
    @click="onCollect"
    :color="value ? '#ffa500' : ''"
    :name="value ? 'star' : 'star-o'"
    :loading="loading"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article-list'
export default {
  name: 'collectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
  },
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏, 取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 未收藏, 收藏文章
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏成功' : '收藏成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('收藏失败')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
