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
import { SET_MODAL_RELATE } from '@store/modules/school-student/mutation-types'
import tableConfig from '@components/views/operational-cooperation/add-course/c-table/table-config'

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
    // 表格数据
    ...mapState('add-course', {
      tableData: state => {
        return state.addCourseList
      },
    }),
  },
  methods: {
    ...mapActions('add-course', [
      'getAddCourseDetailById', // 根据签名获取该课程信息
      'updateReleaseStatus', // 改变启动状态
      'saveAddOrganizationParams', // 储存路由跳转参数
    ]),
    ...mapMutations('school-student', [SET_MODAL_RELATE]),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        case 'edit':
          let params = {
            courseIdSign: row.sign, //课程签名
            providerIdSign: row.schoolIdSign, //提供学校签名
          }
          this.saveAddOrganizationParams(params)
          await this.getAddCourseDetailById(params)
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
  },
}
</script>
<style lang="scss" scoped>
.c-table {
}
</style>
