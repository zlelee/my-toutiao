<template>
  <div class="article-container">文章详情</div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>

</style>
