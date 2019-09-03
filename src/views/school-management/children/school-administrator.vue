<template>
  <div class="school-administrator">
    <!-- 条件搜索 -->
    <c-condition-query
      :form-configs="formConfigs"
      :form-data="formData"
      @handle-search="search"
    >
      <el-button type="primary" size="small" @click="setModalRelate()">
        新增
      </el-button>
    </c-condition-query>
    <!-- 表格以及相关组件 -->
    <c-table />
    <!-- 添加或者编辑modal -->
    <c-manager-modal />
  </div>
</template>
<script>
import CTable from '@components/views/school-management/school-administrator/c-table'
import CManagerModal from '@components/views/school-management/school-administrator/c-modal/c-manager-modal'
import { mapState, mapActions, mapMutations } from 'vuex'
import { SET_MODAL_RELATE } from '@store/modules/school-administrator/mutation-types'
import {
  formConfigs,
  formData,
} from '@configs/search-config/school-administrator'
import { searchCondition } from '@mixins/locality'

export default {
  name: 'school-administrator',
  components: {
    'c-table': CTable,
    'c-manager-modal': CManagerModal,
  },
  mixins: [searchCondition],
  data() {
    return {
      formConfigs,
      formData,
    }
  },
  computed: {
    ...mapState('role-management', {
      roleList: state => state.roleList,
    }),
  },
  methods: {
    ...mapActions('institution-setting', ['getDepartmentTree']),
    ...mapActions('role-management', ['getAllRoleList']),
    ...mapActions('school-administrator', {
      handleGetDataByCondition: 'getAllManagerList',
    }),
    ...mapMutations('school-administrator', [SET_MODAL_RELATE]),
    setModalRelate() {
      console.log(' this.$store', this.$store)
      if (this.roleList.length === 0) {
        this.$message.error('所属角色为空，请先到角色管理页添加角色！')
        return
      }
      this[SET_MODAL_RELATE]({
        methord: 'add',
        isShow: true,
        key: 'addOrEdit',
      })
    },
    // c-condition-query 暴露出的方法，通过改变url的形式触发查找方法
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const {
        date: [createTime = '', endTime = ''],
        phone,
        name,
        status,
        searchFormMeta,
      } = data
      const search = this.$qs.stringify({
        createTime,
        endTime,
        phone,
        name,
        status,
        ...searchFormMeta,
      })
      this.$router.push({
        query: { search },
      })
    },
  },
  async mounted() {
    await this.getDepartmentTree()
    await this.getAllRoleList()
  },
}
</script>
<style lang="scss" scoped>
.school-administrator {
}
</style>
