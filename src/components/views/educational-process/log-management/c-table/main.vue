<template>
  <div class="c-table">
    <e-grid border :data="tableData.list" :columns="tableConfig.columns" />
    <base-pagination :total="tableData.total || 1" />
  </div>
</template>
<script>
import Egrid from 'egrid'
import BasePagination from '@components/base/base-pagination'
import { mapState, mapActions, mapMutations } from 'vuex'
import tableConfig from '@components/views/educational-process/log-management/c-table/table-config'

export default {
  name: 'c-table',
  components: {
    'base-pagination': BasePagination,
    'e-grid': Egrid,
  },
  data() {
    return {
      tableConfig,
    }
  },
  computed: {
    ...mapState('log-management', {
      tableData: state => {
        return state.logList
      },
    }),
  },
}
</script>
<style lang="scss" scoped>
.c-table {
}
</style>
