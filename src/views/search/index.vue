<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'Search',

  data() {
    return {
      searchText: ''
    }
  },

  methods: {
    onSearch(val) {
      console.log(val)
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container{
  .van-search__action{
    color: #fff;
  }
  .van-search__action:active{
    background: transparent;
  }
}
</style>
