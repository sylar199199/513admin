<template>
  <el-dialog
    title="已配置权限账号"
    :visible.sync="show"
    @close="close"
    width="80%"
  >
    <div class="scroll-box">
      <div class="content">
        <e-grid border :data="tableData" :columns="tableConfig.columns" />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">
        关 闭
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import Egrid from 'egrid'
import { mapState, mapMutations } from 'vuex'
import { SET_MODAL_SHOW } from '@store/modules/role-management/mutation-types'
import tableConfig from '@components/views/school-management/role-management/modal/table/role-account-table-config'

export default {
  name: 'role-account-modal',
  components: {
    'e-grid': Egrid,
  },
  data() {
    return {
      show: false,
      tableConfig,
    }
  },
  computed: {
    ...mapState('role-management', {
      isShow: state => state.show.account,
      tableData: state => state.accountList,
    }),
  },
  watch: {
    isShow(cur) {
      this.show = cur
    },
  },
  methods: {
    ...mapMutations('role-management', [SET_MODAL_SHOW]),
    close() {
      this[SET_MODAL_SHOW]({ key: 'account', isShow: false })
    },
    showModal(idSign) {
      this[SET_MODAL_SHOW]({ key: 'account', isShow: true })
    },
  },
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
.scroll-box {
  overflow: auto;
  max-height: calc(100vh - 100px);
  .content {
    padding: 0 50px;
  }
}
</style>
