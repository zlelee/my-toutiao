<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span>全部删除</span>
      <span>完成</span>
      <van-icon name="delete" />
    </van-cell>
    <van-cell v-for="(item, index) in searchHistories" :key="index" :title="item">
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  props: {
    searchHistories: {
      type: Array,
      default: () => []
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
