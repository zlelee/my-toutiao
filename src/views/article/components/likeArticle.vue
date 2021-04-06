<template>
  <van-icon
    :color="value === 1 ? 'red' : ''"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="likeArticle"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article-list'
export default {
  name: 'likeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    async likeArticle() {
      try {
        if (this.value === 1) {
          // 已点赞, 取消点赞
          await deleteCollect(this.articleId)
          this.$emit('input', -1)
        } else {
          // 未点赞, 点赞
          await addCollect(this.articleId)
          this.$emit('input', 1)
        }
        this.$toast.success(!this.value ? '取消点赞' : '点赞成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
