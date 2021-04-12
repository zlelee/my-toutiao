<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`" class="navBar">
      <van-icon slot="left" name="cross" @click="$emit('click-close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />
    <!-- <comment-item /> -->
    <!-- 评论的回复列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item v-for="item in list" :comment="item" :key="item.art_id">
      </comment-item>
    </van-list>
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <van-button class="bottom" @click="isPostShow = true">回复评论</van-button>
    <!-- /底部 -->
    <!-- 发表评论弹层 -->
    <van-popup v-model="isPostShow" position="bottom">
      <div class="comment-post">
        <van-field
          class="post-field"
          v-model.trim="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <van-button
          class="post-btn"
          @click="postComment"
          :disabled="!message.length"
          >发布</van-button
        >
      </div>
    </van-popup>
    <!-- /发表评论弹层 -->
  </div>
</template>

<script>
import commentItem from './comment-item'
import { getComments, addComment } from '@/api/comment'
export default {
  name: 'CommentReply',
  components: {
    commentItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data() {
    return {
      commentList: [],
      offset: null,
      list: [],
      finished: false,
      loading: false,
      isPostShow: false,
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 显示加载中
      this.loading = true
      try {
        const { data } = await getComments({
          type: 'c',
          source: this.comment.com_id.toString(), // 文章id 或 评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 10 // 请求多少条
        })
        const { results } = data.data
        this.list.push(...results)

        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id // 更新获取下一页数据的页码
        } else {
          this.finished = true
        }
      } catch (err) {
        console.dir(err)
      }
    },
    async postComment() {
      console.log(this.articleId)
      console.log(this.comment.com_id)
      try {
        const { data } = await addComment({
          target: this.comment.com_id.toString(),
          content: this.message,
          art_id: this.articleId.toString()
        })
        this.list.push(data.data.new_obj)
        // * 关闭弹层
        this.isPostShow = false
        this.$toast.success('发布评论成功')
        this.message = ''
      } catch (err) {
        console.log(err)
        this.$toast.fail('发布评论失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  border: 1px solid #eee;
}
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
