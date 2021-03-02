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

    <!-- 搜索结果 -->
    <search-result/>
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <search-suggestion/>
    <!-- /联想建议 -->
    <!-- 搜索历史记录 -->
    <search-history/>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'

export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      searchText: ''
    }
  },

  methods: {
    onSearch(val) {
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
  .van-search__action:active {
    background: transparent;
  }
}
</style>
