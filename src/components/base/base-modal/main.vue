<template>
  <el-dialog :visible.sync="show" v-bind="bindProps" v-on="$listeners">
    <slot name="title" />
    <slot />
    <slot name="footer" />
  </el-dialog>
</template>
<script>
export default {
  name: 'base-modal',
  props: {
    modalId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    // 接受props直接作用到modal
    bindProps() {
      return this.$attrs
    },
  },
  methods: {
    // 暴露hide方法
    $hide() {
      this.show = false
    },
    // 暴露hide方法
    $show() {
      this.show = true
    },
  },
  // 初始化监听root EVENT_MODAL_SHOW事件
  created() {
    this.$root.$on('EVENT_MODAL_SHOW', (data, el) => {
      this.show = data === this.modalId
    })
  },
}
</script>
<style lang="scss" scoped></style>
