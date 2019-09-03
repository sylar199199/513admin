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
import { mapState, mapActions } from 'vuex'
import tableConfig from '@components/views/operational-cooperation/introduction-course/c-table/table-config'
import { courseShelves } from '@mixins/locality'
export default {
  name: 'c-table',
  components: {
    'base-pagination': BasePagination,
    'e-grid': Egrid,
  },
  mixins: [courseShelves()],
  data() {
    return {
      tableConfig,
      columnsSchema: tableConfig.columnsSchema(this.statusChange),
      columnsProps: tableConfig.columnsProps,
    }
  },
  computed: {
    ...mapState('introduction-course', {
      // 表格数据
      tableData: state => {
        return state.courseList
      },
    }),
  },
  methods: {
    ...mapActions('introduction-course', [
      'updateReleaseStatus',
      'getIntroductionCourseList',
    ]),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        case 'preview':
          this.$router.push({
            path: `/operationalCooperation/introductionCourse/courseDetail/${
              row.courseIdSign
            }`,
          })
          break
        case 'release':
          this.shelves(row, this.getIntroductionCourseList)
          break
        case 'introduce':
          this.$router.push({
            path:
              '/operationalCooperation/introductionCourse/introductionTeacher',
            query: {
              id: row.courseIdSign,
              schoolIdSign: row.customer,
            },
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
