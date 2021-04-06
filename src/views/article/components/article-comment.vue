<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item v-for="item in list" :comment="item" :key="item.art_id" />
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import commentItem from './comment-item'
export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: [Number, Object, String],
      required: true
    }
  },
  components: {
    commentItem
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      totalCount: 0 // 评论总数
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 显示加载中
      this.loading = true
      try {
        const { data } = await getComments({
          type: 'a',
          source: this.articleId.toString(), // 文章id 或 评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 10 // 请求多少条
        })

        const { results } = data.data
        this.list.push(...results)

        this.loading = false
        // 更新总数据条数
        this.totalCount = data.data.total_count
        // 更新父组件的总数
        this.$parent.total = this.totalCount
        if (results.length) {
          this.offset = data.data.last_id // 更新获取下一页数据的页码
        } else {
          this.finished = true
        }
      } catch (err) {
        console.dir(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
