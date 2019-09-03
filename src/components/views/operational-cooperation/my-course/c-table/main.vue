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
import tableConfig from '@components/views/operational-cooperation/my-course/c-table/table-config'
import { courseShelves } from '@mixins/locality'
import { SET_MODAL_RELATE } from '@store/modules/my-course/mutation-types'
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
    ...mapState('my-course', {
      // 表格数据
      tableData: state => {
        return state.courseList
      },
    }),
  },
  methods: {
    ...mapActions('introduction-course', ['updateReleaseStatus']),
    ...mapActions('my-course', ['getMyCourseList', 'getCooperateDetailById']),
    ...mapMutations('my-course', [SET_MODAL_RELATE]),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        case 'preview':
          this.$router.push({
            path: `/operationalCooperation/myCourse/courseDetail/${
              row.courseIdSign
            }`,
          })
          break
        case 'cooperateDetail':
          let params = {}
          params.courseIdSign = row.courseIdSign //课程签名
          await this.getCooperateDetailById(params)
          this[SET_MODAL_RELATE]({
            key: 'addOrEdit',
            isShow: true,
            methord: 'add',
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
