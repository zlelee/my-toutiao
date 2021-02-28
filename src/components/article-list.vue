<template>
  <div class="home-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article-list'
export default {
  name: '',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false
    }
  },
  created() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 往数组中追加数据
        const { results } = data.data
        this.list.push(...results)

        // 模拟错误
        if (Math.random() > 0.2) {
          JSON.parse('ssfafsafsa')
        }
        this.loading = false
        if (!results.length) {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
}
</style>
