<template>
  <div class="search-container">
    <form action="/" class="form">
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
    <search-result v-if="isResultShow" :searchText="searchText" />
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <search-suggestion :searchText="searchText" v-else-if="searchText" />
    <!-- /联想建议 -->
    <!-- 搜索历史记录 -->
    <search-history @clear="clear" :searchHistories="searchHistories" v-else />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { getItem, setItem } from '@/utils/storage'
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
      searchHistories: getItem('serach-histories') || []
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
  },
  watch: {
    searchHistories (val) {
    // 同步到本地存储
      setItem('serach-histories', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 110px;
  .van-search__action {
    color: #fff;
  }
  .van-search__action:active {
    background: transparent;
  }
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
