<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="userInfo.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="isShowUpdateName = true"
    />
    <van-cell
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
      @click="isShowUpdateGender = true"
    />
    <van-cell title="生日" :value="userInfo.birthday" is-link />

    <!-- 修改昵称弹窗 -->
    <!-- 编辑昵称弹层 -->
    <van-popup
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <update-name v-model="userInfo.name" @close="closeUpdateName" />
    </van-popup>
    <!-- 编辑昵称弹层 -->
    <!-- 编辑性别弹层 -->
    <van-popup v-model="isShowUpdateGender" position="bottom">
      <update-gender v-model="userInfo.gender" @close="isShowUpdateGender = false" />
    </van-popup>
    <!-- 编辑性别弹层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name'
import updateGender from './components/update-gender'
export default {
  name: '',
  components: {
    updateName,
    updateGender
  },
  data() {
    return {
      userInfo: {},
      isShowUpdateName: false, // 修改用户昵称弹窗
      isShowUpdateGender: false // 修改用户性别弹窗
    }
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    async getUserProfile() {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        console.log(err)
        this.$toast.fail('加载用户信息失败')
      }
    },
    closeUpdateName(newName) {
      this.isShowUpdateName = false
      if (newName) {
        this.userInfo.name = newName
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
