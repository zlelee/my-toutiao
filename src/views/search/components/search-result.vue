<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search.js'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    async onLoad () {
      this.loading = true
      try {
        const { data } = await getSearch({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        const { data: { results } } = data
        console.log(results)
      } catch (err) {
        this.$toast.fail('加载文章失败')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
