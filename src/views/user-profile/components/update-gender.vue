<template>
  <div class="update-gender-container">
     <van-picker
    title="性别"
    show-toolbar
    :default-index="value"
    :columns="columns"
    @cancel="$emit('close')"
    @confirm="onConfirm"
    @change="onChange"
  />
  </div>
</template>

<script>
import { updateUserName } from '@/api/user'
export default {
  name: '',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  created() {
  },
  methods: {
    async onConfirm() {
      try {
        const { data } = await updateUserName({
          gender: parseInt(this.gender)
        })
        console.log(data)
        this.$toast.success('修改性别成功')
        this.$emit('close')
        this.$emit('input', this.gender)
      } catch (err) {
        console.log(err)
        this.$toast.fail('修改性别失败')
      }
    },
    onChange(picker, value, index) {
      this.gender = index
    }
  }
}
</script>

<style lang='less' scoped>

</style>
