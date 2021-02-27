<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <van-button class="search-btn" slot="title" icon="search" round>
        搜索</van-button
      >
    </van-nav-bar>
    <!-- Tab标签页 -->
    <van-tabs v-model="active" animated swipeable swipe-threshold="3">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      active: 0
    }
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.home-container {
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    color: #fff;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
}
</style>
