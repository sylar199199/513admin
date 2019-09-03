<template>
  <div>
    <el-switch v-model="value" @change="handleChange" />
    <span>
      {{ value ? config.activeText : config.inactiveText }}
    </span>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'c-switch',
  props: {
    row: {
      type: Object,
      default: () => {},
    },
    // 配置文件 主要包括 activeText ,inactiveText, initValue,
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      value: false,
    }
  },
  /**
   * 通知功能的bug加监听解决
   */
  computed: {
    ...mapState('announcements', {
      tableData: state => state.bulletinList,
    }),
    ...mapState('adverting-management', {
      tableDataAdverment: state => state.advertingList,
    }),
  },
  watch: {
    tableData: function(val) {
      this.value = this.config.initValue
    },
    tableDataAdverment: function(val) {
      this.value = this.config.initValue
    },
  },
  methods: {
    handleChange() {
      this.$confirm(
        `是否${
          this.config.initValue
            ? this.config.confirmInactiveText
            : this.config.confirmActiveText
        }？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(() => {
          this.$emit('switch-change', {
            row: this.row,
            cb: needReset => {
              if (needReset) this.value = !this.value
            },
          })
        })
        .catch(() => {
          this.value = !this.value
          this.$message({
            type: 'info',
            message: '已取消更改',
          })
        })
    },
  },
  created() {
    this.value = this.config.initValue
  },
}
</script>
<style lang="scss" scoped></style>
