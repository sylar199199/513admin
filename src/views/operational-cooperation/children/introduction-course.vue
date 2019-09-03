<template>
  <c-nest-layout parent-router-name="introductionCourse">
    <template v-slot:nest>
      <c-condition-query
        :form-configs="formConfigs"
        :form-data="formData"
        @handle-search="search"
      >
        <i />
      </c-condition-query>
      <c-table />
    </template>
    <template v-slot:child>
      <router-view />
    </template>
  </c-nest-layout>
</template>
<script>
import CTable from '@components/views/operational-cooperation/introduction-course/c-table'
import { mapActions, mapMutations } from 'vuex'
import { formConfigs, formData } from '@configs/search-config/course-management'
import { searchCondition } from '@mixins/locality'

export default {
  name: 'introduction-course',
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
    ...mapActions('introduction-course', {
      handleGetDataByCondition: 'getIntroductionCourseList',
    }),
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const {
        date: [startTime = '', endTime = ''],
        teacherName,
        status,
        searchFormMeta,
      } = data
      const search = this.$qs.stringify({
        startTime,
        endTime,
        teacherName,
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
.introduction-course {
}
</style>
