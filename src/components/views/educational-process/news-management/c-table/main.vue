<template>
  <div class="c-table">
    <e-grid
      border
      :data="tableData.list"
      :columns="tableConfig.columns"
      :columns-handler="columnsHandler"
      :columns-schema="columnsSchema"
    />
    <base-pagination :total="tableData.total || 1" />
  </div>
</template>
<script>
import Egrid from 'egrid'
import BasePagination from '@components/base/base-pagination'
import { mapState, mapActions, mapMutations } from 'vuex'
import tableConfig from '@components/views/educational-process/news-management/c-table/table-config'

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
    ...mapState('news-management', {
      tableData: state => {
        return state.newsList
      },
    }),
  },
  methods: {
    ...mapActions('news-management', {
      updateNewstatus: 'updateNewstatus',
      deleteNews: 'deleteNews',
      getNewsList: 'getNewsList',
    }),
    // 状态更改
    async statusChange({ sign, status }, cb = null) {
      cb(
        !(await this.updateNewstatus({
          sign,
          status: status === '启用',
        })),
      )
    },
    // table action相关
    ...tableConfig.actions(),
    handleAction(methods, row = {}) {
      switch (methods) {
        case 'edit':
          this.jumpEditNews(row.sign)
          break
        case 'delete':
          this.delete(row.sign, row.title)
          break
        default:
          break
      }
    },
    jumpEditNews(sign) {
      this.$router.push({
        path: `/educationalProcess/newsManagement/editNews/${sign}`,
      })
    },
    // 删除相关
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
            const res = await await this.deleteNews(sign)
            if (res.ok) {
              this.$message.success('删除成功!')
              await this.getNewsList()
              if (typeof callback === 'function') callback(res.data)
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
  },
}
</script>
<style lang="scss" scoped>
.c-table {
}
</style>
