<template>
  <c-nest-layout parent-router-name="schoolEnterpriseManagement">
    <template v-slot:nest>
      <c-condition-query
        :form-configs="formConfigs"
        :form-data="formData"
        @handle-search="search"
      >
        <el-button
          class="add-button"
          type="primary"
          size="small"
          @click="addSchool()"
        >
          新增
        </el-button>
      </c-condition-query>
      <c-table @handle-show="show = true" />
      <c-modal :show="show" @handle-change="changeModal" />
    </template>
    <template v-slot:child>
      <router-view />
    </template>
  </c-nest-layout>
</template>
<script>
import CTable from '@components/views/school-management/school-enterprise-management/c-table'
import CModal from '@components/views/school-management/school-enterprise-management/c-modal'
import { mapActions } from 'vuex'
import { searchCondition } from '@mixins/locality'
import {
  formConfigs,
  formData,
} from '@configs/search-config/school-enterprise-management'

export default {
  name: 'schoolEnterpriseManagement',
  components: {
    'c-table': CTable,
    'c-modal': CModal,
  },
  mixins: [searchCondition],
  data() {
    return {
      formConfigs,
      formData,
      show: false, // 控制modal外层show
    }
  },
  methods: {
    ...mapActions('school-enterprise-management', {
      handleGetDataByCondition: 'getAllSchoolList',
    }),
    ...mapActions('school-enterprise-management', [
      'getUpdateSchoolAllAdministrator',
    ]),
    ...mapActions('school-administrator', ['getSchoolAllAdministrator']),
    changeModal() {
      this.show = false
    },
    // c-condition-query 暴露出的方法，通过改变url的形式触发查找方法
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const {
        date: [createTime = '', endTime = ''],
        type,
        status,
        searchFormMeta,
      } = data
      const search = this.$qs.stringify({
        createTime,
        endTime,
        type,
        status,
        ...searchFormMeta,
      })
      this.$router.push({
        query: { search },
      })
    },
    async addSchool() {
      this.show = true
      const res = await this.getSchoolAllAdministrator()
      if (res.ok) {
        return true
      }
    },
  },
  mounted() {
    this.getSchoolAllAdministrator()
  },
}
</script>
<style lang="scss" scoped>
.school-enterprise-management {
  padding-top: 30px;
}
</style>
