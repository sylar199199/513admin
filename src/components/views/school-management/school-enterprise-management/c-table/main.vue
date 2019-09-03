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
import { mapState, mapActions } from 'vuex'
import tableConfig from '@components/views/school-management/school-enterprise-management/c-table/table-config'

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
    ...mapState('school-enterprise-management', {
      tableData: state => {
        return state.accountListData
      },
      currentSchoolData: state => state.currentSchoolData,
    }),
  },
  methods: {
    ...mapActions('school-enterprise-management', {
      resetPassword: 'resetSchoolPassword',
      updateSchoolStatus: 'updateSchoolStatus',
      getSchoolById: 'getSchoolById',
    }),
    ...mapActions('school-administrator', ['getUpdateSchoolAllAdministrator']),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        case 'reset':
          this.handleReset(row)
          break

        case 'edit':
          //获取关联销售人员
          this.updateComList(row)
          ;(await this.getSchoolById(row.sign)) && this.$emit('handle-show')
          break
        case 'auth':
          this.$router.push(
            '/schoolManagement/schoolEnterpriseManagement/certificatedInformation?sign=' +
              row.sign,
          )
          break

        default:
          break
      }
    },
    async updateComList(row) {
      await this.getUpdateSchoolAllAdministrator(row.sign)
    },
    // 重置操作
    handleReset(row) {
      this.accountInfoConfigs = []
      this.accountInfoConfigs.push({
        key: '校企名称',
        value: row.schoolName,
      })
      this.accountInfoConfigs.push({ key: '登录账号', value: row.account })
      this.resetAccountPassword(row.schoolName, row.managerIdSign, data => {
        this.accountInfoConfigs.push({ key: '账号密码', value: data })
        this.show = true
      })
    },
    // status 改变相关
    async statusChange({ sign, status }, cb = null) {
      cb(
        !(await this.updateSchoolStatus({
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
