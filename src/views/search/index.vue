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
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText"/>
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <search-suggestion :searchText="searchText" v-else-if="searchText"/>
    <!-- /联想建议 -->
    <!-- 搜索历史记录 -->
    <search-history @clear='clear' :searchHistories="searchHistories" v-else/>
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
      searchText: '',
      isResultShow: false,
      searchHistories: []
    }
  },

  methods: {
    onSearch(val) {
      this.isResultShow = true
      const idx = this.searchHistories.indexOf(val)
      if (idx > -1) {
        this.searchHistories.splice(idx, 1)
      }
      this.searchHistories.unshift(val)
    },
    onCancel() {
      this.$router.back()
    },
    clear(params) {
      if (params === []) {
        this.searchHistories = []
      } else {
        this.searchHistories.splice(params, 1)
      }
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
