<template>
  <div class="search-suggestion">
    <van-cell v-for="(item,index) in suggestion" :key="index" :title="item" icon="search"></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
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
      handler(val) {
        this.loadSuggestion(val)
      },
      immediate: true // 一上来就触发一次
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
