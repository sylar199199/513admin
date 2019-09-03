<template>
  <div>
    <div class="add-course">
      <c-condition-query
        :form-configs="_formConfigs"
        :form-data="formData"
        @handle-search="search"
      >
        <i />
      </c-condition-query>
      <c-table />
      <c-add-course-modal />
      <!--      <c-upload-modal />-->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formData, formConfigs } from '@configs/search-config/add-course'
import CTable from '@components/views/operational-cooperation/add-course/c-table'
import { searchCondition } from '@mixins/locality'
import CAddCourseModal from '@components/views/operational-cooperation/add-course/c-modal/c-add-course-modal'
export default {
  name: 'index',
  components: {
    'c-table': CTable,
    'c-add-course-modal': CAddCourseModal,
  },
  mixins: [searchCondition],
  data() {
    return {
      formData,
      formConfigs,
      moduleType: {},
    }
  },
  computed: {
    _formConfigs() {
      const types = Object.keys(this.moduleType).map(key => {
        return {
          label: this.moduleType[key].schoolName,
          value: this.moduleType[key].schoolName,
        }
      })
      return this.formConfigs(types)
    },
  },
  methods: {
    ...mapActions('add-course', {
      handleGetDataByCondition: 'getAllAddCourseList',
      getAddCourseSelectlist: 'getAddCourseSelectlist',
    }),
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const {
        date: [startTime = '', endTime = ''],
        searchFormMeta,
        status,
      } = data
      const schoolName = data.teacherName
      const search = this.$qs.stringify({
        startTime,
        endTime,
        status,
        schoolName,
        ...searchFormMeta,
      })
      this.$router.push({
        query: { search },
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
