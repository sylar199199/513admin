<template>
  <div class="adverting-management">
    <c-condition-query
      :form-configs="_formConfigs"
      :form-data="formData"
      @handle-search="search"
    >
      <div>
        <el-button
          type="primary"
          size="small"
          @click="
            setModalRelate({ isShow: true, key: 'addOrEdit', methord: 'add' })
          "
        >
          新增
        </el-button>
      </div>
    </c-condition-query>
    <c-adverting-modal />
    <c-adverting-details />
    <c-table />
  </div>
</template>
<script>
import CAdvertingModal from '@components/views/educational-process/adverting-management/c-modal/c-adverting-modal'
import CAdvertingDetails from '@components/views/educational-process/adverting-management/c-modal/c-adverting-details'
import CTable from '@components/views/educational-process/adverting-management/c-table'
import { mapActions, mapState, mapMutations } from 'vuex'
import { SET_ADVERTING_RELATE } from '@store/modules/adverting-management/mutation-types'
import { searchCondition } from '@mixins/locality'
import {
  formConfigs,
  formData,
} from '@configs/search-config/adverting-management'

export default {
  name: 'adverting-management',
  components: {
    'c-table': CTable,
    'c-adverting-modal': CAdvertingModal,
    'c-adverting-details': CAdvertingDetails,
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
    ...mapActions('adverting-management', {
      getEventTypeList: 'getEventTypeList',
      handleGetDataByCondition: 'getAdvertingList',
    }),
    ...mapMutations('adverting-management', {
      setModalRelate: SET_ADVERTING_RELATE,
    }),
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const { content, status, searchFormMeta } = data
      const search = this.$qs.stringify({
        content,
        status,
        ...searchFormMeta,
      })
      this.$router.push({
        query: { search },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.adverting-management {
}
</style>
