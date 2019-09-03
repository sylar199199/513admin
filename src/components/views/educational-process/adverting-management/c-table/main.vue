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
import tableConfig from '@components/views/educational-process/adverting-management/c-table/table-config'
import { SET_ADVERTING_RELATE } from '@store/modules/adverting-management/mutation-types'
import { DISPLAY_ADVERTING_DETAILS } from '@store/modules/adverting-management/mutation-types'

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
    ...mapState('adverting-management', {
      tableData: state => {
        return state.advertingList
      },
    }),
  },
  methods: {
    ...mapActions('adverting-management', [
      'deleteAdvertising',
      'getAdvertingList',
      'getAdverListById',
      'updateAdvertisingDeleteFlag',
    ]),
    ...mapMutations('adverting-management', [SET_ADVERTING_RELATE]),
    ...mapMutations('adverting-management', [DISPLAY_ADVERTING_DETAILS]),
    // table action相关
    ...tableConfig.actions(),
    handleAction(methods, row = {}) {
      switch (methods) {
        case 'detail':
          this[DISPLAY_ADVERTING_DETAILS]({
            key: 'details',
            isShow: true,
          })
          this.getAdverListById(row.idSign)
          break
        case 'edit':
          this[SET_ADVERTING_RELATE]({
            key: 'addOrEdit',
            isShow: true,
            methord: 'edit',
          }),
            this.getAdverListById(row.idSign)
          break
        case 'delete':
          this.delete(row.idSign, row.title)
          break
        default:
          break
      }
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
            const res = await await this.deleteAdvertising(sign)
            if (res.ok) {
              this.$message.success('删除成功!')
              await this.getAdvertingList()
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
    // status 改变相关
    async statusChange({ idSign, status }, cb = null) {
      cb(
        !(await this.updateAdvertisingDeleteFlag({
          sign: idSign,
          status: status === '启用',
        })),
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.c-table {
}
</style>
