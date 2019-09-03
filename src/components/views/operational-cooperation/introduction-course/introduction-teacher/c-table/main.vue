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
  </div>
</template>
<script>
import Egrid from 'egrid'
import { mapState, mapActions } from 'vuex'
import tableConfig from '@components/views/operational-cooperation/introduction-course/introduction-teacher/c-table/table-config'
export default {
  name: 'c-table',
  components: {
    'e-grid': Egrid,
  },
  props: {
    nowPage: Number,
  },
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
        return state.introduceTeacherList
      },
    }),
  },
  methods: {
    ...mapActions('introduction-course', [
      'getAllIntroduceTeacherList',
      'deleteIntroduceTeacher',
    ]),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        case 'delete':
          this.delete(row.id, row.userName)
          break

        default:
          break
      }
    },
    // 删除相关
    delete(sign, userName) {
      const h = this.$createElement
      this.$msgbox({
        title: '警告',
        message: h('p', null, [
          h('span', null, '是否删除'),
          h('i', { style: 'color: teal' }, userName),
          h('span', null, '?'),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            const res = await await this.deleteIntroduceTeacher({ sign })
            if (res) {
              this.$message.success('删除成功!')
              await this.getAllIntroduceTeacherList({
                page: 1,
                size: 10,
                courseIdSign: this.$route.query.id,
              })
              done()
            }
          } else {
            done()
          }
        },
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
  },
  async mounted() {
    const params = {
      page: 1,
      size: 10,
      courseIdSign: this.$route.query.id,
    }
    await this.getAllIntroduceTeacherList(params)
  },
}
</script>
<style lang="scss" scoped>
.c-table {
}
</style>
