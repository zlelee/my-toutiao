<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" icon="search" round>
        搜索</van-button
      >
    </van-nav-bar>
    <!-- Tab标签页 -->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      animated
      swipeable
      swipe-threshold="3"
    >
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
        class="van-tabs_wrap"
      >
        <article-list :channel="channel"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="editChannel=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 编辑频道的弹出层 -->
    <van-popup
      v-model="editChannel"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    />
  </div>
</template>

<script>
import { getArticleList } from '@/api/article-list'
import ArticleList from './article-list'
export default {
  name: 'Home',
  components: {
    ArticleList
  },
  data() {
    return {
      active: 0,
      channels: [],
      editChannel: false
    }
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getArticleList()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 180px;
  padding-bottom: 100px;
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
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 2;
      width: 100%;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }
}
</style>
