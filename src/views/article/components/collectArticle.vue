<template>
  <van-icon @click="onCollect" :color="value ? '#ffa500' : ''" :name="value ? 'star' : 'star-o'" />
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
    return {}
  },
  created() {
  },
  methods: {
    async onCollect() {
      try {
        if (this.value) {
          // 已收藏, 取消收藏
          await deleteCollect(this.articleId)
          this.$toast.success('取消收藏成功')
        } else {
          // 未收藏, 收藏文章
          await addCollect(this.articleId)
          this.$toast.success('收藏成功')
        }
        this.$emit('input', !this.value)
      } catch (err) {
        console.log(err)
        this.$toast.fail('收藏失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
