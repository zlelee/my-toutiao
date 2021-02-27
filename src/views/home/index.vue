<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <van-button class="search-btn" slot="title" icon="search" round>
      搜索</van-button>
    </van-nav-bar>

  </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
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
  /deep/ .van-nav-bar__title{
      max-width: unset;
  }
}
</style>
