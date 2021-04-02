<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-if="showDelete" @click="deleteAll">全部删除</span>
      <span v-if="showDelete" @click="showDelete=false">完成</span>
      <van-icon name="delete" v-else @click="showDelete=true"/>
    </van-cell>
    <van-cell v-for="(item, index) in searchHistories" :key="index" :title="item">
      <van-icon name="close" v-if="showDelete" @click="deleteHistory(index)"/>
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
      showDelete: false
    }
  },

  methods: {
    deleteAll() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要删除全部历史记录?'
      }).then(() => {
        // on confirm
        this.$emit('clear', [])
      }).catch(e => e)
    },
    deleteHistory(index) {
      this.$emit('clear', index)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
