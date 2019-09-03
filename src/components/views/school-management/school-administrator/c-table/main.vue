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
import { resetAccountpassword } from '@mixins/locality'
import { mapState, mapActions, mapMutations } from 'vuex'
import { SET_MODAL_RELATE } from '@store/modules/school-administrator/mutation-types'
import tableConfig from '@components/views/school-management/school-administrator/c-table/table-config'

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
      columnsSchema: tableConfig.columnsSchema(this.statusChange),
    }
  },
  computed: {
    ...mapState('school-administrator', {
      tableData: state => {
        return state.managerList
      },
    }),
  },
  methods: {
    ...mapActions('school-administrator', {
      resetPassword: 'resetManagerPassword',
      updateSchoolStatus: 'updateManagerStatus',
      getSchoolAdministratorById: 'getSchoolAdministratorById',
    }),
    ...mapMutations('school-administrator', [SET_MODAL_RELATE]),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        case 'reset':
          // 生成一个倒计时modal显示的字段list
          this.accountInfoConfigs = []
          this.accountInfoConfigs.push({ key: '登录账号', value: row.account })
          this.resetAccountPassword(row.name, row.idSign, data => {
            this.accountInfoConfigs.push({ key: '账号密码', value: data })
            this.show = true
          })
          break
        case 'edit':
          await this.getSchoolAdministratorById({
            sign: row.idSign,
            key: row.departmentName,
          })
          this[SET_MODAL_RELATE]({
            key: 'addOrEdit',
            isShow: true,
            methord: 'edit',
          })
          break

        default:
          break
      }
    },
    // status 改变相关
    async statusChange({ idSign, status }, cb = null) {
      cb(
        !(await this.updateSchoolStatus({
          sign: idSign,
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
