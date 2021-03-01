<template>
  <div>
    {{myChannels}}
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
  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>

</style>
