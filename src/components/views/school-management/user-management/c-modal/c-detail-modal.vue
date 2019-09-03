<template>
  <el-dialog
    title="用户详情"
    :visible.sync="dialogVisible"
    width="50%"
    center
    @close="close"
  >
    <el-row class="info-row" v-for="(item, key) in userInfo" :key="key">
      <el-col class="info-key" :span="10"> {{ item.key }}: </el-col>
      <el-col class="info-value" :span="14">
        {{ item.value | infoFilter(item.key) }}
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">
        关闭
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { SET_MODAL_SHOW } from '@store/modules/user-management/mutation-types'
const sexMap = { '0': '不公开', '1': '男', '2': '女' }
export default {
  name: 'c-detail-modal',
  data() {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    ...mapState('user-management', {
      show: state => state.show.detail,
      userInfo: state => state.userDetail,
    }),
  },
  watch: {
    show(cur) {
      this.dialogVisible = cur
    },
  },
  methods: {
    ...mapMutations('user-management', [SET_MODAL_SHOW]),
    close() {
      this[SET_MODAL_SHOW]({
        methods: 'detail',
        isShow: false,
      })
    },
  },
  filters: {
    infoFilter(value, methord) {
      if (value === null) return '-'
      switch (methord) {
        case '性别':
          return sexMap[value]
          break
        default:
          return value
          break
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.info-row {
  margin-bottom: 10px;
  .info-key {
    text-align: right;
    padding-right: 25px;
  }
}
</style>
