<template>
  <div class="role-management">
    <el-row :gutter="20">
      <el-col
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        v-for="(item, index) in roleList"
        :key="index"
      >
        <authority-creator
          :role-info="item"
          :index="index"
          @handleRole="handleRole"
        />
      </el-col>
      <el-col :xs="12" :sm="8" :md="6" :lg="4">
        <authority-creator @handleRole="handleRole" />
      </el-col>
    </el-row>
    <role-modal ref="roleModal" />
    <role-permission-configuration ref="treeModal" />
    <role-account-modal ref="accountModal" />
  </div>
</template>
<script>
import AuthorityCreator from '@components/views/school-management/role-management/authority-creator'
import RoleModal from '@components/views/school-management/role-management/modal/role-modal'
import RolePermissionConfiguration from '@components/views/school-management/role-management/modal/role-permission-configuration'
import RoleAccountModal from '@components/views/school-management/role-management/modal/role-account-modal'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'RoleManagement',
  components: {
    'authority-creator': AuthorityCreator,
    'role-modal': RoleModal,
    'role-permission-configuration': RolePermissionConfiguration,
    'role-account-modal': RoleAccountModal,
  },
  data() {
    return {
      treeShow: false,
      permissionTree: {},
    }
  },
  computed: {
    ...mapState('role-management', {
      roleList: state => state.roleList,
    }),
  },
  methods: {
    ...mapActions('role-management', [
      'getAllRoleList',
      'getRoleTreeView',
      'getRoleAccountList',
    ]),
    // 账号角色操作
    async handleRole(data) {
      // 存在获取信息的操作统一放在父组件，避免其他的情况造成重复获取
      switch (data.type) {
        case 'role':
          this.$refs.roleModal.showModal(data.data.index)
          break
        case 'accountManage':
          await this.getRoleAccountList(data.data.sign)
          this.$refs.accountModal.showModal(data.data.index)
          break
        case 'tree':
          await this.getRoleTreeView({ idSign: data.data.sign })
          this.$refs.treeModal.showModal(data.data.sign, data.data.name)
          break
        default:
          break
      }
    },
  },
  async mounted() {
    await this.getAllRoleList()
  },
}
</script>
<style lang="scss" scoped>
.role-management {
  padding: 0 10px;
  min-height: 100%;
}
</style>
