<template>
  <div class="update-name-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="editName"
    />
    <!-- /导航栏 -->
    <div style="padding: 10px;">
      <van-field
        style="border: 1px solid #eee"
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserName } from '@/api/user'
export default {
  name: '',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localName: ''
    }
  },
  created() {
    this.localName = this.value
  },
  methods: {
    async editName() {
      try {
        await updateUserName({
          name: this.localName
        })
        this.$toast.success('修改用户昵称成功')
        this.$emit('close', this.localName)
      } catch (err) {
        console.log(err)
        this.$toast.fail('修改昵称失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background: #f5f7f9;
}
</style>
