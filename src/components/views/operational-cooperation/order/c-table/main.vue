<template>
  <div class="c-table">
    <e-grid
      border
      :data="tableData.list"
      :columns="tableConfig.columns"
      :columns-schema="columnsSchema"
    />
  </div>
</template>
<script>
import Egrid from 'egrid'
import { mapState } from 'vuex'
import tableConfig from '@components/views/operational-cooperation/order/c-table/table-config'

export default {
  name: 'c-table',
  components: {
    'e-grid': Egrid,
  },
  data() {
    return {
      tableConfig,
      columnsSchema: tableConfig.columnsSchema(this.statusChange),
    }
  },
  computed: {
    // 表格数据
    ...mapState('order', {
      tableData: state => {
        return state.orderList
      },
    }),
  },
  methods: {
    // table action相关
    ...tableConfig.actions(),
    // action操作 reset edit
    async handleAction() {},
  },
}
</script>
<style lang="scss" scoped>
.c-table {
}
</style>
