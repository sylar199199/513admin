<template>
  <div>
    <c-nest-layout parent-router-name="courseManagement">
      <template v-slot:nest>
        <c-condition-query
          :form-configs="formConfigs"
          :form-data="formData"
          @handle-search="search"
        >
          <i />
        </c-condition-query>
        <c-table />
        <c-course-modal />
      </template>
      <template v-slot:child>
        <router-view />
      </template>
    </c-nest-layout>
  </div>
</template>
<script>
import CTable from '@components/views/source-management/course-management/c-table'
import CCourseModal from '@components/views/source-management/course-management/c-modal/c-course-modal'
import { mapActions, mapMutations } from 'vuex'
import { searchCondition } from '@mixins/locality'
import { formConfigs, formData } from '@configs/search-config/course-management'

export default {
  name: 'course-management',
  components: {
    'c-table': CTable,
    'c-course-modal': CCourseModal,
  },
  mixins: [searchCondition],
  data() {
    return {
      formConfigs,
      formData,
    }
  },
  methods: {
    ...mapActions('course-management', {
      handleGetDataByCondition: 'getAllCourseList',
    }),
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const {
        date: [createTime = '', endTime = ''],
        status,
        searchFormMeta,
        teacherName,
      } = data
      const search = this.$qs.stringify({
        createTime,
        endTime,
        status,
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
