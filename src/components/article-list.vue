<template>
  <div class="article-container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-duration="1500" :success-text="successText">
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
    </van-pull-refresh>
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
      error: false,
      refreshing: false,
      timestamp: null,
      successText: '刷新成功'
    }
  },
  created() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 往数组中追加数据
        const { results } = data.data
        this.list.push(...results)
        // 模拟错误
        /*  if (Math.random() > 0.2) {
          JSON.parse('ssfafsafsa')
        } */
        this.loading = false
        // 判断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = results.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 往数组中追加数据
        const { results } = data.data
        this.list.unshift(...results)
        this.refreshing = false
        this.successText = `刷新成功,共更新了${results.length}条数据`
      } catch (err) {
        this.refreshing = false
        this.successText = '刷新失败,请稍后再试'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-container{
  height: 79vh;
  overflow-y: auto;
}
</style>
