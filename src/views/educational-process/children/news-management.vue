<template>
  <c-nest-layout parent-router-name="newsManagement">
    <template v-slot:nest>
      <c-condition-query
        :form-configs="_formConfigs"
        :form-data="formData"
        @handle-search="search"
      >
        <div>
          <el-button type="primary" size="small" @click="add()">
            新增
          </el-button>
        </div>
      </c-condition-query>
      <c-news-modal />
      <c-table />
    </template>
    <template v-slot:child>
      <router-view />
    </template>
  </c-nest-layout>
</template>
<script>
import CNewsModal from '@components/views/educational-process/news-management/c-modal/c-news-modal'
import CTable from '@components/views/educational-process/news-management/c-table'
import { mapActions, mapState, mapMutations } from 'vuex'
import { SET_ADVERTING_RELATE } from '@store/modules/adverting-management/mutation-types'
import { searchCondition } from '@mixins/locality'
import { formConfigs, formData } from '@configs/search-config/news-management'

export default {
  name: 'news-management',
  components: {
    'c-table': CTable,
    'c-news-modal': CNewsModal,
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
    ...mapActions('news-management', {
      handleGetDataByCondition: 'getNewsList',
    }),
    add() {
      this.$router.push('/educationalProcess/newsManagement/newsAdd')
    },
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const { content, status, searchFormMeta } = data
      const search = this.$qs.stringify({
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
.news-management {
}
</style>
