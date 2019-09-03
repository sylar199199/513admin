<template>
  <div class="c-table">
    <e-grid
      border
      :data="tableData.cooperationVoList"
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
import { SET_MODAL_RELATE } from '@store/modules/add-course/mutation-types'
import tableConfig from '@components/views/operational-cooperation/add-course/c-table-2/table-config'

export default {
  name: 'c-table',
  components: {
    'base-pagination': BasePagination,
    'e-grid': Egrid,
  },
  data() {
    return {
      providerSign: '',
      courseIdSign: '',
      row: null,
      tableConfig,
      columnsSchema: tableConfig.columnsSchema(this.statusChange),
      columnsProps: tableConfig.columnsProps,
    }
  },
  computed: {
    ...mapState('add-course', {
      // 表格数据
      tableData: state => {
        if (state.AddCourseDetail[0] === undefined) {
          return []
        } else {
          return state.AddCourseDetail[0]
        }
      },
      //供课学校机构数据
      schoolIdSignState: state => {
        return state.addOrganizationParamsSchool
      },
      //合作机构数据
      courseIdSignState: state => {
        return state.addOrganizationParamsCourse
      },
    }),
  },
  methods: {
    ...mapActions('add-course', {
      handleGetDataByCondition: 'getAllAddCourseList',
    }),
    ...mapActions(
      'add-course',
      // 根据签名获取该课程信息
      ['updateAddcourseStatus', 'getAddCourseDetailById', 'deleteIntroduce'],
    ),
    ...mapMutations('school-student', [SET_MODAL_RELATE]),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        // 编辑 ${}
        case 'edit':
          this.row = row
          this.courseIdSign = this.courseIdSignState
          this.providerSign = this.schoolIdSignState
          this.$router.push({
            path: `/operationalCooperation/add-course/cooperativeOrganizationEdit/${
              this.courseIdSign
            }/${this.providerSign}/${this.row.sign}`,
          })
          this[SET_MODAL_RELATE]({
            key: 'addOrEdit',
            isShow: false,
            methord: 'edit',
          })
          break
        case 'delete':
          this.delete(row.sign)
          break
      }
    },
    delete(sign, title) {
      const h = this.$createElement
      this.$msgbox({
        title: '警告',
        message: h('p', null, [
          h('span', null, '是否删除'),
          h('i', { style: 'color: teal' }, title),
          h('span', null, '?'),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'loading...'
            const res = await await this.deleteIntroduce(sign)
            if (res.ok) {
              let params = {}
              params.courseIdSign = this.courseIdSignState //课程签名
              params.providerIdSign = this.schoolIdSignState //提供学校签名
              await this.getAddCourseDetailById(params)
            }
            done()
            instance.confirmButtonLoading = false
          } else {
            done()
          }
        },
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    // status 改变状态
    async statusChange({ sign, status }, cb = null) {
      cb(
        !(await this.updateAddcourseStatus({
          sign: sign,
          status: status === '启用',
        })),
      )
      let params = {}
      params.courseIdSign = this.courseIdSignState //课程签名
      params.providerIdSign = this.schoolIdSignState //提供学校签名
      await this.getAddCourseDetailById(params)
    },
  },
}
</script>
<style lang="scss" scoped>
.c-table {
}
</style>
