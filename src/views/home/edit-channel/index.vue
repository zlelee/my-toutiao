<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false" title="我的频道">
      <van-button size="mini" round type="danger" plain>编辑</van-button>
    </van-cell>
    <!-- 宫格 -->
    <van-grid :column-num="4" :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
    <!-- 频道推荐 -->
      <van-cell :border="false" title="频道推荐">
    </van-cell>
    <!-- 宫格 -->
    <van-grid :column-num="4" :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'editChannel',
  props: {
    myChannels: {
      type: Array,
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
