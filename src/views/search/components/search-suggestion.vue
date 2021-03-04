<template>
  <div class="search-suggestion">
    <van-cell v-for="(item,index) in suggestion" :key="index" :title="item" icon="search"></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestion: []
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (val) {
        this.loadSuggestion(val)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async loadSuggestion (q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestion = data.data.options
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
