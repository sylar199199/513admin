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
// import { SET_MODAL_RELATE } from '@store/modules/school-student/mutation-types'
import tableConfig from '@components/views/source-management/audit-course-list/c-table/table-config'

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
    ...mapState('audit-course-list', {
      // 表格数据
      tableData: state => state.auditList,
    }),
  },
  methods: {
    ...mapActions(
      'audit-course-list',
      // 获取全部审核列表 更改审核状态
      ['getAllAuditList', 'updateCourseAuditStatus'],
    ),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        case 'preview':
          this.$router.push({
            path: `/sourceManagement/courseManagement/courseDetail/${row.sign}`,
          })
          break
        case 'agree':
          this.agree(row, this.getAllAuditList)
          break
        case 'reject':
          this.reject(row, this.getAllAuditList)
          break
        default:
          break
      }
    },
    //审核通过
    agree({ releaseStatus, courseName, sign }, callback = null) {
      const auditRseult = 2
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('i', { style: 'color: teal' }, `${courseName}:`),
          h('span', null, `确定该课程通过审核`),
          h('span', null, '?'),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'loading...'
            const res = await await this.updateCourseAuditStatus({
              sign: sign,
              auditStatus: auditRseult,
            })
            if (res.ok) {
              this.$message.success(`${courseName}审核成功!`)
              if (typeof callback === 'function') callback()
            }
            done()
            instance.confirmButtonLoading = false
          } else {
            done()
          }
        },
      }).catch(() => {
        this.$message.info('取消审核该课程')
      })
    },
    //审核不通过
    reject({ releaseStatus, courseName, sign }, callback = null) {
      const auditRseult = 3
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('i', { style: 'color: teal' }, `${courseName}:`),
          h('span', null, `确定该课程不能通过审核`),
          h('span', null, '?'),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'loading...'
            const res = await await this.updateCourseAuditStatus({
              sign: sign,
              auditStatus: auditRseult,
            })
            if (res.ok) {
              this.$message.success(`${courseName}未通过您的审核!`)
              if (typeof callback === 'function') callback()
            }
            done()
            instance.confirmButtonLoading = false
          } else {
            done()
          }
        },
      }).catch(() => {
        this.$message.info('取消审核该课程')
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.c-table {
}
</style>
