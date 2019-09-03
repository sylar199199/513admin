<template>
  <div class="school-teacher">
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
    <c-teacher-modal />
    <c-upload-modal />
  </div>
</template>
<script>
import CTable from '@components/views/source-management/school-teacher/c-table'
import CTeacherModal from '@components/views/source-management/school-teacher/c-modal/c-teacher-modal'
import CUploadModal from '@components/views/source-management/school-teacher/c-modal/c-upload-modal'
import { searchCondition } from '@mixins/locality'
import { mapActions, mapState, mapMutations } from 'vuex'
import { SET_MODAL_RELATE } from '@store/modules/school-teacher/mutation-types'
import { formConfigs, formData } from '@configs/search-config/school-teacher'

export default {
  name: 'school-teacher',
  components: {
    'c-table': CTable,
    'c-teacher-modal': CTeacherModal,
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
    ...mapActions('school-teacher', {
      handleGetDataByCondition: 'getAllTeacherLists',
    }),
    ...mapActions('school-teacher', ['getTeacherDownloadUrl']),
    ...mapActions('institution-setting', ['getDepartmentTree']),
    ...mapMutations('school-teacher', {
      setModalRelate: SET_MODAL_RELATE,
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
    async getUrl() {
      await this.getTeacherDownloadUrl()
    },
  },
  async mounted() {
    await this.getDepartmentTree()
  },
}
</script>
<style lang="scss" scoped>
.school-teacher {
}
</style>
