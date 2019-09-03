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
import { mapState, mapActions } from 'vuex'
import tableConfig from '@components/views/operational-cooperation/provide-course-management/c-table/table-config'
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
    }
  },
  computed: {
    ...mapState('provide-course-management', {
      // 表格数据
      tableData: state => {
        return state.privoieCourseList
      },
    }),
  },
  methods: {
    ...mapActions('introduction-course', ['updateReleaseStatus']),
    ...mapActions('provide-course-management', ['getProvideCourseManagement']),
    ...mapActions('add-course', ['saveAddOrganizationParams']),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        case 'preview':
          this.$router.push({
            path: `/operationalCooperation/provideCourseList/courseDetail/${
              row.courseIdSign
            }`,
          })
          break
        case 'release':
          this.shelves(row, this.getProvideCourseManagement)
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
