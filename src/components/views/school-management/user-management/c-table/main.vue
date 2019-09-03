<template>
  <div class="c-table">
    <e-grid
      border
      :data="tableData.list"
      :columns="tableConfig.columns"
      :columns-schema="columnsSchema"
      :columns-handler="columnsHandler"
    />
    <base-pagination :total="tableData.total || 1" />
    <base-countdown-modal
      :counts="counts"
      :show="show"
      :account-info-configs="accountInfoConfigs"
      @handle-modal-change="show = false"
    />
  </div>
</template>
<script>
import Egrid from 'egrid'
import BasePagination from '@components/base/base-pagination'
import { mapState, mapActions, mapMutations } from 'vuex'
import { resetAccountpassword } from '@mixins/locality'
import tableConfig from '@components/views/school-management/user-management/c-table/table-config'
import { SET_MODAL_SHOW } from '@store/modules/user-management/mutation-types'

export default {
  name: 'c-table',
  components: {
    'base-pagination': BasePagination,
    'e-grid': Egrid,
  },
  mixins: [resetAccountpassword],
  data() {
    return {
      tableConfig,
      columnsSchema: tableConfig.columnsSchema(
        this.showBind,
        this.statusChange,
      ),
    }
  },
  computed: {
    ...mapState('user-management', {
      tableData: ({ userListData }) => userListData,
    }),
  },
  methods: {
    ...mapActions('user-management', {
      getUserRoleInfo: 'getUserRoleInfo',
      updateUserStatus: 'updateUserStatus',
      resetPassword: 'resetUserPassword',
      getByUsersId: 'getByUsersId',
    }),
    ...mapMutations('user-management', [SET_MODAL_SHOW]),
    ...tableConfig.actions(),
    // 操作按钮
    async handleAction(row, methods) {
      switch (methods) {
        case 'reset':
          this.accountInfoConfigs = []
          this.accountInfoConfigs.push({ key: '手机号码', value: row.phone })
          this.resetAccountPassword(row.userName, row.sign, data => {
            this.accountInfoConfigs.push({ key: '账号密码', value: data })
            this.show = true
          })
          break
        case 'detail':
          if (await this.getByUsersId(row.sign))
            this[SET_MODAL_SHOW]({ methods: 'detail', isShow: true })
          break

        default:
          break
      }
    },
    // 显示绑定信息
    async showBind(row, methods) {
      if (await this.getUserRoleInfo(row.sign))
        this[SET_MODAL_SHOW]({ methods: 'bind', isShow: true })
    },
    // 状态更改
    async statusChange({ sign, status }, cb = null) {
      cb(
        !(await this.updateUserStatus({
          sign,
          status: status !== '启用',
        })),
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.c-table {
}
</style>
