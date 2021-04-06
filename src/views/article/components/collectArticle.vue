<template>
  <van-icon :color="value ? '#ffa500' : ''" :name="value ? 'star' : 'star-o'" />
</template>

<script>
export default {
  name: 'collectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped></style>
