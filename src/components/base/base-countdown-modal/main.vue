<template>
  <el-dialog
    title="密码重置成功"
    :visible.sync="dialogVisible"
    width="30%"
    :close-on-press-escape="closeable"
    :show-close="closeable"
    :close-on-click-modal="closeable"
    center
    @close="close"
  >
    <el-row
      class="account-item"
      v-for="(item, key) in accountInfoConfigs"
      :key="key"
    >
      <el-col class="account-key" :span="10"> {{ item.key }}: </el-col>
      <el-col :span="14">
        {{ item.value }}
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        :disabled="!closeable"
        :loading="!closeable"
        @click="close"
      >
        {{ countNum | coountdownTextFilter }}
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'base-countdown-modal',
  props: {
    counts: {
      type: Number,
      default: 3,
    },
    show: {
      type: Boolean,
      default: false,
    },
    accountInfoConfigs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialogVisible: false,
      closeable: false,
      countNum: 0,
    }
  },
  computed: {
    _show() {
      return this.show
    },
  },
  watch: {
    _show(cur) {
      this.dialogVisible = cur
      if (cur) {
        this.countdown()
      }
    },
  },
  methods: {
    close() {
      this.closeable = false
      this.$emit('handle-modal-change')
    },
    countdown() {
      this.countNum = this.counts
      this.timerId = setInterval(() => {
        this.countNum--
        if (this.countNum <= 0) {
          clearInterval(this.timerId)
          this.closeable = true
        }
      }, 1000)
    },
  },
  filters: {
    coountdownTextFilter(value) {
      if (value <= 0) {
        return '确定'
      } else {
        return `确定(${value})s`
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.account-item {
  margin-bottom: 10px;
  .account-key {
    text-align: right;
    padding-right: 25px;
  }
}
</style>
