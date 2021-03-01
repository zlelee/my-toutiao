<template>
  <van-cell>
    <div slot="title">{{ article.title }}</div>
    <div slot="label">
      <span>{{ article.aut_name }}</span>
      <span>{{ article.comm_count }}评论</span>
      <span>{{ article.pubdate }}</span>
    </div>
    <!-- 当列表项 图片数量为 3 时 -->
    <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            width="100"
            height="100"
            :src="img"
          />
        </div>
      </div>
    <!-- 当列表项 图片数量为 1 时 -->
   <van-image v-if="article.cover.type === 1 " :src="article.cover.images[0]"></van-image>
  </van-cell>
</template>

<script>
export default {
  name: 'articleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped></style>
