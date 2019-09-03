<template>
  <div class="c-search">
    <el-input
      :placeholder="searchPlaceholder"
      v-model.trim="value"
      clearable
      width="100px"
      size="small"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        type="primary"
        size="small"
        @click="handleAction('search')"
      />
      <el-button
        slot="append"
        icon="el-icon-refresh"
        type="primary"
        size="small"
        @click="
          handleAction('reset')
          value = ''
        "
      />
      <el-button
        size="small"
        slot="append"
        :icon="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        type="primary"
        @click="handleAction('fold')"
      />
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'c-search',
  props: {
    searchPlaceholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: '',
      isFold: false,
    }
  },
  methods: {
    handleAction(methods) {
      const fold = {}
      if (methods === 'fold') {
        this.isFold = !this.isFold
        fold.isFold = this.isFold
      }
      this.$emit('handle-action', { methods, ...fold })
    },
  },
}
</script>
<style lang="scss" scoped>
.c-search {
  .el-input-group__prepend {
    background-color: $maincolor;
  }
}
</style>
