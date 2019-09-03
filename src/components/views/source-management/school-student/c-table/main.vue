<template>
  <div class="c-table">
    <e-grid
      border
      :data="tableData.list"
      :columns="tableConfig.columns"
      :columns-schema="columnsSchema"
      :columns-handler="columnsHandler"
      :columns-props="columnsProps"
    />
    <base-pagination :total="tableData.total || 1" />
  </div>
</template>
<script>
import Egrid from 'egrid'
import BasePagination from '@components/base/base-pagination'
import { mapState, mapActions, mapMutations } from 'vuex'
import { SET_MODAL_RELATE } from '@store/modules/school-student/mutation-types'
import tableConfig from '@components/views/source-management/school-student/c-table/table-config'

export default {
  name: 'c-table',
  components: {
    'base-pagination': BasePagination,
    'e-grid': Egrid,
  },
  data() {
    return {
      tableConfig,
      columnsSchema: tableConfig.columnsSchema(this.statusChange),
      columnsProps: tableConfig.columnsProps,
    }
  },
  computed: {
    ...mapState('school-student', {
      // 表格数据
      tableData: state => {
        return state.schoolStudentList
      },
    }),
  },
  methods: {
    ...mapActions(
      'school-student',
      // 更新教师状态
      ['updateStudentStatus', 'getStudentById'],
    ),
    ...mapMutations('school-student', [SET_MODAL_RELATE]),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        case 'edit':
          await this.getStudentById(row.idSign)
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
        !(await this.updateStudentStatus({
          idSign: idSign,
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
