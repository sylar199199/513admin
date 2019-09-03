<template>
  <div class="user-management">
    <c-condition-query
      :form-configs="formConfigs"
      :form-data="formData"
      @handle-search="search"
    >
      <el-button type="primary" size="small">
        {{ `总计${userCounts || 0}位用户` }}
      </el-button>
    </c-condition-query>
    <c-table />
    <c-bind-modal />
    <c-detail-modal />
  </div>
</template>
<script>
import CTable from '@components/views/school-management/user-management/c-table'
import CBindModal from '@components/views/school-management/user-management/c-modal/c-bind-modal.vue'
import CDetailModal from '@components/views/school-management/user-management/c-modal/c-detail-modal.vue'
import { searchCondition } from '@mixins/locality'
import { mapState, mapActions } from 'vuex'
import {
  formConfigs,
  formData,
} from '@configs/search-config/school-user-management'

export default {
  name: 'user-management',
  mixins: [searchCondition],
  components: {
    'c-table': CTable,
    'c-bind-modal': CBindModal,
    'c-detail-modal': CDetailModal,
  },
  data() {
    return {
      formConfigs,
      formData,
    }
  },
  computed: {
    ...mapState('user-management', {
      userrList: ({ userListData }) => userListData,
      userCounts: ({ userCounts }) => userCounts,
    }),
  },
  methods: {
    ...mapActions('user-management', {
      handleGetDataByCondition: 'getAllUsersList',
      getUserCount: 'getUserCount',
    }),
    search(data) {
      data.date =
        data.date === null && typeof data.date === 'object' ? [] : data.date
      const {
        date: [createTime = '', endTime = ''],
        searchFormMeta,
        userName,
        bindFlag,
        status,
      } = data
      const search = this.$qs.stringify({
        createTime,
        endTime,
        userName,
        bindFlag,
        status,
        ...searchFormMeta,
      })
      this.$router.push({
        query: { search },
      })
    },
  },
  mounted() {
    this.getUserCount()
  },
}
</script>
<style lang="scss" scoped>
.user-management {
}
</style>
