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
import tableConfig from '@components/views/educational-process/announcements/c-table/table-config'

export default {
  name: 'c-table',
  components: {
    'base-pagination': BasePagination,
    'e-grid': Egrid,
  },
  props: {
    nowStatus: String,
  },
  data() {
    return {
      tableConfig,
      columnsSchema: tableConfig.columnsSchema(this.statusChange),
    }
  },
  computed: {
    ...mapState('announcements', {
      tableData: state => {
        return state.bulletinList
      },
    }),
  },
  methods: {
    ...mapActions('announcements', [
      'updateBulletinStatus',
      'deleteBulletin',
      'getAllBulletin',
    ]),
    // table action相关
    ...tableConfig.actions(),
    // tableDataList() {
    //   return this.$store.state['announcements'].bulletinList.list
    // },
    handleAction(methods, row = {}) {
      switch (methods) {
        case 'edit':
          if (row.msgType === '3') {
            this.$router.push({
              path: '/educationalProcess/announcements/editBulletin',
              query: {
                sign: row.sign,
                msgType: row.msgType,
              },
            })
          }
          if (row.msgType === '2') {
            this.$router.push({
              path: '/educationalProcess/courseNotify/editBulletin',
              query: {
                sign: row.sign,
                msgType: row.msgType,
              },
            })
          }
          if (row.msgType === '1') {
            this.$router.push({
              path: '/educationalProcess/schoolNotify/editBulletin',
              query: {
                sign: row.sign,
                msgType: row.msgType,
              },
            })
          }
          break
        case 'delete':
          this.delete(row.sign, row.title)
          break
        default:
          break
      }
    },
    // status 改变相关
    async statusChange({ sign, status }, cb = null) {
      cb(
        !(await this.updateBulletinStatus({
          sign,
          status: status === '启用',
          notifyType: this.nowStatus,
        })),
      )
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
            const data = {
              sign,
              notifyType: this.nowStatus,
            }
            const res = await await this.deleteBulletin(data)
            if (res.ok) {
              this.$message.success('删除成功!')
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
