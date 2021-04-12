<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item @reply-click="replyClick" v-for="item in list" :comment="item" :key="item.art_id">
      </comment-item>
    </van-list>
    <!-- 评论列表 -->
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" :style="{ height: '100%' }">
      <comment-reply :articleId="articleId" v-if="isReplyShow" @click-close="isReplyShow = false" :comment="replyComment"/>
    </van-popup>
    <!-- /评论回复 -->
        <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import commentItem from './comment-item'
import commentReply from './comment-reply'
export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: [Number, Object, String],
      default: null
    },
    commentId: {
      type: [Number, Object, String],
      default: null
    }
  },
  components: {
    commentItem,
    commentReply
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      totalCount: 0, // 评论总数
      isReplyShow: false, // 回复评论弹窗
      replyComment: null
    }
  },
  created() {
    this.onLoad()
    this.$eventBus.$on('postCommentSuccess', (newComment) => {
      this.list.unshift(newComment)
    })
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
        // *这里要正好是根节点, 不能是 vant 组件库中的组件
        this.$parent.total = this.totalCount
        if (results.length) {
          this.offset = data.data.last_id // 更新获取下一页数据的页码
        } else {
          this.finished = true
        }
      } catch (err) {
        console.dir(err)
      }
    },
    replyClick(comment) {
      this.replyComment = comment
      this.isReplyShow = true
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
  z-index: 1;
}

.van-list {
  margin-bottom: 45px;
}
</style>
