<template>
  <div class="c-nest-layout">
    <div v-if="!isShowRouterView || shuoldNestShow">
      <slot name="nest" />
    </div>
    <div v-if="isShowRouterView">
      <slot name="child" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'c-nest-layout',
  props: {
    parentRouterName: {
      type: String,
      default: '',
    },
    shuoldNestShow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isShowRouterView() {
      return this.parentRouterName !== this.$route.name
    },
  },
}
</script>
<style lang="scss" scoped>
.c-nest-layout {
}
</style>
