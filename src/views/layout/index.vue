<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar route class="tab-bar">
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
  .tab-bar {
    z-index: 999;
    .toutiao {
      font-size: 40px;
    }
    .text {
      font-size: 20px;
    }
  }
}
</style>
