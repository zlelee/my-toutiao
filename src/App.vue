<template>
  <div id="app">
    <!-- 子路由出口 -->
    <router-view />
    <i class="toutiao toutiao-shipin"></i>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.box {
  width: 750px;
  height: 100px;
  background-color: #fff;
}
</style>
