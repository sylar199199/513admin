<template>
  <c-nest-layout parent-router-name="myCourse">
    <template v-slot:nest>
      <c-condition-query
        :form-configs="formConfigs"
        :form-data="formData"
        @handle-search="search"
      >
        <i />
      </c-condition-query>
      <c-table />
      <c-cooperate-detail-modal />
    </template>
    <template v-slot:child>
      <router-view />
    </template>
  </c-nest-layout>
</template>
<script>
import CTable from '@components/views/operational-cooperation/my-course/c-table'
import { mapActions, mapMutations } from 'vuex'
import { formConfigs, formData } from '@configs/search-config/course-management'
import { searchCondition } from '@mixins/locality'
import CCooperateDetailModal from '@components/views/operational-cooperation/my-course/c-modal/c-cooperate-detail-modal'

export default {
  name: 'my-course',
  components: {
    'c-table': CTable,
    'c-cooperate-detail-modal': CCooperateDetailModal,
  },
  mixins: [searchCondition],
  data() {
    return {
      formConfigs,
      formData,
    }
  },
  methods: {
    ...mapActions('my-course', {
      handleGetDataByCondition: 'getMyCourseList',
    }),
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const {
        date: [startTime = '', endTime = ''],
        phone,
        teacherName,
        status,
        searchFormMeta,
      } = data
      const search = this.$qs.stringify({
        startTime,
        endTime,
        phone,
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
  .search-box {
    width: 200px;
  }
}
</style>
