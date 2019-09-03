<template>
  <div class="c-table">
    <e-grid
      border
      :data="tableData.list"
      :columns="tableConfig.columns"
      :columns-schema="columnsSchema"
      :columns-handler="columnsHandler"
    />
    <div class="pagination-box">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="10"
        :page-sizes="[10, 20]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import Egrid from 'egrid'
import { mapState, mapActions, mapMutations } from 'vuex'
import tableConfig from '@components/views/educational-process/my-notify/c-table/table-config'
import { SET_MODAL_DETAIL } from '@store/modules/announcements/mutation-types'
export default {
  name: 'c-table',
  components: {
    'e-grid': Egrid,
  },
  data() {
    return {
      currentPage: 10,
      pageSize: 10,
      tableConfig,
      columnsSchema: tableConfig.columnsSchema(this.statusChange),
    }
  },
  computed: {
    ...mapState('announcements', {
      // 表格数据
      tableData: state => {
        return state.myNofityList
      },
      total: state => {
        return parseInt(state.myNofityList.total)
      },
    }),
  },
  methods: {
    ...mapMutations('announcements', ['SET_MODAL_DETAIL']),
    ...mapActions('announcements', [
      'deleteBulletin',
      'getMyNotifyList',
      'getBulletinById',
      'getMyNotifyPost',
    ]),
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction(row, methods) {
      switch (methods) {
        case 'detail':
          this.getNotifyDetail(row.sign)
          this[SET_MODAL_DETAIL]({
            isShow: true,
            key: 'addOrEdit',
          })
          break
        case 'delete':
          this.delete(row.sign, row.title)
          break

        default:
          break
      }
    },
    async getNotifyDetail(sign) {
      await this.getBulletinById(sign)
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
            const res = await await this.deleteBulletin(sign)
            if (res.ok) {
              this.$message.success('删除成功!')
              await this.getMyNotifyList()
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
    handleCurrentChange(val) {
      this.pageNum = val
      const numSizeObj = {
        page: this.pageNum,
        size: 10,
      }
      this.getMyNotifyPost(numSizeObj)
    },
    handleSizeChange(val) {},
  },
}
</script>
<style lang="scss" scoped>
.c-table {
  .pagination-box {
    display: flex;
    justify-content: center;
    margin: 10px 0 0;
  }
}
</style>
