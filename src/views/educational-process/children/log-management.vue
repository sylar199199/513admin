<template>
  <div class="log-management">
    <c-condition-query
      :form-configs="_formConfigs"
      :form-data="formData"
      @handle-search="search"
    >
      <!-- 占位，后期可修改条件判断位置，即可取消占位标签 -->
      <i />
    </c-condition-query>
    <c-table />
  </div>
</template>
<script>
import CTable from '@components/views/educational-process/log-management/c-table'
import { mapActions, mapState, mapMutations } from 'vuex'
import { searchCondition } from '@mixins/locality'
import { formConfigs, formData } from '@configs/search-config/log-management'

export default {
  name: 'log-management',
  components: {
    'c-table': CTable,
  },
  mixins: [searchCondition],
  data() {
    return {
      formConfigs,
      formData,
      moduleType: {},
    }
  },
  computed: {
    _formConfigs() {
      const types = Object.keys(this.moduleType).map(key => {
        return {
          label: this.moduleType[key],
          value: key,
        }
      })
      return this.formConfigs(types)
    },
  },
  methods: {
    ...mapActions('log-management', {
      getEventTypeList: 'getEventTypeList',
      handleGetDataByCondition: 'getLogList',
    }),
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const {
        date: [createTime = '', endTime = ''],
        searchFormMeta,
        type,
      } = data
      const search = this.$qs.stringify({
        createTime,
        endTime,
        type,
        ...searchFormMeta,
      })
      this.$router.push({
        query: { search },
      })
    },
  },
  async mounted() {
    const res = await this.getEventTypeList()
    if (res.ok) {
      this.moduleType = res.data
    }
  },
}
</script>
<style lang="scss" scoped>
.log-management {
}
</style>
