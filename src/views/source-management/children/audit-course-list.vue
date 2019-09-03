<template>
  <div>
    <c-nest-layout parent-router-name="auditCourseList">
      <template v-slot:nest>
        <c-condition-query
          :form-configs="formConfigs"
          :form-data="formData"
          @handle-search="search"
        >
          <!-- 占位，后期可修改条件判断位置，即可取消占位标签 -->
          <i />
        </c-condition-query>
        <c-table />
      </template>
      <template v-slot:child>
        <router-view />
      </template>
    </c-nest-layout>
  </div>
</template>
<script>
import CTable from '@components/views/source-management/audit-course-list/c-table'
import { mapActions } from 'vuex'
import { searchCondition } from '@mixins/locality'
import { formConfigs, formData } from '@configs/search-config/audit-course-list'

export default {
  name: 'audit-course-list',
  components: {
    'c-table': CTable,
  },
  mixins: [searchCondition],
  data() {
    return {
      formConfigs,
      formData,
    }
  },
  methods: {
    ...mapActions('audit-course-list', {
      handleGetDataByCondition: 'getAllAuditList',
    }),
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const {
        date: [createTime = '', endTime = ''],
        auditStatus,
        searchFormMeta,
        teacherName,
      } = data
      const search = this.$qs.stringify({
        auditStatus,
        createTime,
        endTime,
        teacherName,
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
.course-management {
}
</style>
