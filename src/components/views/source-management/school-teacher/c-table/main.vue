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
  </div>
</template>
<script>
import Egrid from 'egrid'
import BasePagination from '@components/base/base-pagination'
import { mapState, mapActions, mapMutations } from 'vuex'
import { SET_MODAL_RELATE } from '@store/modules/school-teacher/mutation-types'
import tableConfig from '@components/views/source-management/school-teacher/c-table/table-config'

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
    }
  },
  computed: {
    ...mapState('school-teacher', {
      // 表格数据
      tableData: state => {
        return state.teacherList
      },
    }),
  },
  methods: {
    ...mapActions('school-teacher', {
      // 更新教师状态
      updateTeacherStatus: 'updateTeacherStatus',
      getTeacher: 'getTeacherById',
    }),
    ...mapMutations('school-teacher', [SET_MODAL_RELATE]),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        case 'edit':
          this[SET_MODAL_RELATE]({
            key: 'addOrEdit',
            isShow: true,
            methord: 'edit',
          })
          await this.getTeacher({
            idSign: row.idSign,
            key: row.departmentName,
          })
          break
        case 'detail':
          // await this.getSchoolAdministratorById({
          //   sign: row.idSign,
          //   key: row.departmentName,
          // })
          break

        default:
          break
      }
    },
    // status 改变相关
    async statusChange({ idSign, status }, cb = null) {
      cb(
        !(await this.updateTeacherStatus({
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
