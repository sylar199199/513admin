<template>
  <div class="school-student">
    <c-condition-query
      :form-configs="formConfigs"
      :form-data="formData"
      @handle-search="search"
    >
      <div>
        <el-button
          type="primary"
          size="small"
          @click="
            setModalRelate({ methord: 'add', isShow: true, key: 'addOrEdit' })
          "
        >
          新增
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="
            setModalRelate({ isShow: true, key: 'upload' })
            getUrl()
          "
        >
          批量导入
        </el-button>
      </div>
    </c-condition-query>
    <c-table />
    <c-student-modal />
    <c-upload-modal />
  </div>
</template>
<script>
import CTable from '@components/views/source-management/school-student/c-table'
import CStudentModal from '@components/views/source-management/school-student/c-modal/c-student-modal'
import CUploadModal from '@components/views/source-management/school-student/c-modal/c-upload-modal'
import { searchCondition } from '@mixins/locality'
import { mapActions, mapState, mapMutations } from 'vuex'
import { SET_MODAL_RELATE } from '@store/modules/school-student/mutation-types'
import { formConfigs, formData } from '@configs/search-config/school-student'

export default {
  name: 'school-student',
  components: {
    'c-table': CTable,
    'c-student-modal': CStudentModal,
    'c-upload-modal': CUploadModal,
  },
  mixins: [searchCondition],
  data() {
    return {
      formConfigs,
      formData,
    }
  },
  methods: {
    ...mapActions('school-student', {
      handleGetDataByCondition: 'getAllStudentList',
    }),
    ...mapActions('school-student', ['getDownloadUrl']),
    ...mapMutations('school-student', {
      setModalRelate: SET_MODAL_RELATE,
    }),
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const {
        date: [createTime = '', endTime = ''],
        status,
        searchFormMeta,
        studentName,
      } = data
      const search = this.$qs.stringify({
        createTime,
        endTime,
        status,
        studentName,
        ...searchFormMeta,
      })
      this.$router.push({
        query: { search },
      })
    },
    async getUrl() {
      await this.getDownloadUrl()
    },
  },
}
</script>
<style lang="scss" scoped>
.school-student {
}
</style>
