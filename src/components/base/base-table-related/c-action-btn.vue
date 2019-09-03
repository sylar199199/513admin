<template>
  <div>
    <el-button
      v-for="(item, key) in config"
      :key="key"
      v-bind="item.props"
      @click="action(item.methods)"
    >
      {{ item.name }}
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'c-action-btn',
  props: {
    row: {
      type: Object,
      default: () => {},
    },
    config: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    action(methods) {
      this.$emit('action-click', this.row, methods)
    },
  },
}
</script>
<style lang="scss" scoped></style>
