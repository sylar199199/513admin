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
import tableConfig from '@components/views/source-management/course-management/c-table/table-config'
import { SET_MODAL_RELATE } from '@store/modules/course-detail/mutation-types'

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
    ...mapState('auth', {
      // 表格数据
      isAdministrator: state => {
        return state.userInfo.roleStr
      },
    }),
    ...mapState('course-management', {
      // 表格数据
      tableData: state => {
        return state.courseList
      },
    }),
  },
  methods: {
    ...mapActions(
      'course-management',
      // 获取课程列表
      ['updateReleaseLessionStatus', 'getAllCourseList'],
    ),
    //获取课程详情
    ...mapActions('course-detail', ['getDetailsbyId']),
    ...mapMutations('course-detail', [SET_MODAL_RELATE]),
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
        case 'release':
          this.shelves(row, this.getAllCourseList)
          break
        case 'edit':
          this.getDetailsbyId(row.sign)
          this[SET_MODAL_RELATE]({ isShow: true })
          break
        default:
          break
      }
    },
    //更改课程发布状态
    shelves({ releaseStatus, courseName, sign }, callback = null) {
      const isPutaway = releaseStatus !== '未发布'
      const h = this.$createElement
      this.$msgbox({
        title: (isPutaway && '警告') || '提示',
        message: h('p', null, [
          h('span', null, `是否： ${(isPutaway && '下架') || '上架'}课程：`),
          h('i', { style: 'color: teal' }, courseName),
          h('span', null, '?'),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'loading...'
            const res = await await this.updateReleaseLessionStatus({
              sign: sign,
              status: !isPutaway,
            })
            if (res.ok) {
              this.$message.success(`${(isPutaway && '下架') || '上架'}成功!`)
              if (typeof callback === 'function') callback()
            }
            done()
            instance.confirmButtonLoading = false
          } else {
            done()
          }
        },
      }).catch(() => {
        this.$message.info('取消上架或者下架课程')
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.c-table {
}
</style>
