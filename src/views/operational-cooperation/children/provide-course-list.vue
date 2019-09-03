<template>
  <div>
    <c-nest-layout parent-router-name="provideCourseList">
      <template v-slot:nest>
        <c-condition-query
          :form-configs="formConfigs"
          :form-data="formData"
          @handle-search="search"
        >
          <i></i>
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
import CTable from '@components/views/operational-cooperation/provide-course-management/c-table'
import {
  formConfigs,
  formData,
} from '@configs/search-config/provide-course-management'
import { mapActions, mapMutations } from 'vuex'
import { searchCondition } from '@mixins/locality'
import { SET_MODAL_RELATE } from '@store/modules/provide-course-management/mutation-types'
export default {
  name: 'provide-course-list',
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
  methods: {
    ...mapActions('provide-course-management', {
      handleGetDataByCondition: 'getProvideCourseManagement',
    }),
    setModalRelate: function() {
      this.$router.push({
        path: '/operationalCooperation/provideCourseManagement/addCourse',
      })
    },
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
.provide-course-management {
}
</style>
