<template>
  <span :class="{ active: config.isBind }" @click="handleClick">
    {{ row.bindFlag }}
  </span>
</template>
<script>
export default {
  name: 'c-bind',
  props: {
    row: {
      type: Object,
      default: () => {},
    },
    config: {
      type: Object,
      default: () => ({ methods: null }),
    },
  },
  methods: {
    handleClick() {
      if (this.config.isBind) {
        this.$emit('bind-click', this.row, this.config.methods)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
span {
  cursor: pointer;
  &.active {
    color: $maincolor;
  }
}
</style>
