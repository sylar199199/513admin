<template>
  <el-dialog
    title="角色权限配置"
    :visible.sync="show"
    @close="close"
    width="50%"
  >
    <el-dialog
      width="30%"
      title="警告"
      :visible.sync="innerVisible"
      append-to-body
    >
      <div class="content">
        {{ `确认删除该角色：${roleName}？` }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          :loading="innerLoading"
          @click="modalDeleteRole"
        >
          确 认
        </el-button>
        <el-button @click="innerVisible = false">
          取 消
        </el-button>
      </span>
    </el-dialog>
    <div class="scroll-box">
      <div class="content">
        <p class="tree-header clearfix">
          <span class="left">
            角色名称
          </span>
          <span class="left">
            {{ roleName }}
          </span>
          <span class="delete-role right" @click="innerVisible = true">
            删除该角色
          </span>
        </p>
        <el-tree
          :props="defaultProps"
          node-key="sign"
          :data="permissionTree.treeView"
          :default-checked-keys="permissionTree.defaultChecked"
          show-checkbox
          default-expand-all
          ref="tree"
          highlight-current
          @check-change="handleCheckChange"
          @getCheckedNodes="getCheckedNodes"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="ok">
        保 存
      </el-button>
      <el-button @click="close">
        关 闭
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {
  SET_MODAL_SHOW,
  SET_ROLE_TREE_CHECKED_CHANGE_LIST,
  SET_TREE_INIT,
} from '@store/modules/role-management/mutation-types'

export default {
  name: 'role-permission-configuration',
  data() {
    return {
      show: false,
      loading: false,
      innerLoading: false,
      innerVisible: false, // 内嵌modal
      roleSign: null, // role sign
      roleName: '',
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  computed: {
    ...mapState('role-management', {
      isShow: state => state.show.tree,
      permissionTree: state => state.roleTree,
      thirdGradeList: state => state.thirdGradeList,
    }),
  },
  watch: {
    isShow(cur) {
      this.show = cur
    },
  },
  methods: {
    ...mapMutations('role-management', [
      SET_MODAL_SHOW,
      SET_ROLE_TREE_CHECKED_CHANGE_LIST,
      SET_TREE_INIT,
    ]),
    ...mapActions('role-management', ['setRolePermission', 'deleteRole']),
    getCheckedNodes(value) {},
    async ok() {
      this.loading = true
      await this.setRolePermission({
        roleSign: this.roleSign,
        children: this.$refs.tree.getCheckedNodes(false, true),
      })
      this.loading = false
      this[SET_MODAL_SHOW]({ key: 'tree', isShow: false })
    },
    close() {
      this[SET_MODAL_SHOW]({ key: 'tree', isShow: false })
      this[SET_TREE_INIT]()
    },
    // 父组件调用子组件show方法
    showModal(sign, name) {
      this.roleSign = sign
      this.roleName = name
      this[SET_MODAL_SHOW]({ key: 'tree', isShow: true })
    },
    // 权限树状态发生改变时调用，收集已经改变的状态
    handleCheckChange(data, checked, indeterminate) {
      // console.log('dong', data)
      // console.log('checked', checked)
      // console.log('indeterminate', indeterminate)
      // 1级2级过滤
      if (data.level === '0' || data.level === '1') return
      const { sign, parentSign } = data
      // 存放三级list
      this[SET_ROLE_TREE_CHECKED_CHANGE_LIST]({
        checkedChangeList: {
          sign,
          checked,
          parentSign,
        },
      })
    },
    // 删除role
    async modalDeleteRole() {
      this.innerLoading = true
      const res = await this.deleteRole(this.roleSign)
      this.innerLoading = false
      if (res) {
        this.innerVisible = false
        this[SET_MODAL_SHOW]({ key: 'tree', isShow: false })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
.scroll-box {
  overflow: auto;
  height: calc(100vh - 400px);
  .content {
    padding: 0 50px;
    .tree-header {
      line-height: 12px;
      font-size: 12px;
      margin-bottom: 15px;
      span:nth-child(2) {
        margin-left: 20px;
      }
      .delete-role {
        color: #f00;
        cursor: pointer;
      }
    }
  }
}
</style>
