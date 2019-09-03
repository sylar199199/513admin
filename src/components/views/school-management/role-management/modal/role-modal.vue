<template>
  <el-dialog
    :title="isAdd ? '新增角色' : '修改角色'"
    :visible.sync="show"
    @close="close"
    width="50%"
  >
    <div class="scroll-box">
      <div class="content">
        <base-form
          :form-data="formData"
          :rules="rules"
          :form-configs="_formConfigs"
          ref="form"
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
import BaseForm from '@components/base/base-form'
import {
  formData,
  rules,
  formConfigs,
} from '@components/views/school-management/role-management/modal/form/role-form-config'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import {
  SET_MODAL_SHOW,
  SET_CURRENT_INDEX,
} from '@store/modules/role-management/mutation-types'

export default {
  name: 'role-modal',
  components: {
    'base-form': BaseForm,
  },
  data() {
    return {
      show: false,
      formData,
      rules,
      formConfigs,
      loading: false,
    }
  },
  computed: {
    ...mapGetters('role-management', ['getCurrentRoleInfo']),
    ...mapState('role-management', { isShow: state => state.show.role }),
    _formConfigs() {
      return this.formConfigs()
    },
    isAdd() {
      return !this.getCurrentRoleInfo.name
    },
  },
  watch: {
    isShow(cur) {
      this.show = cur
    },
    getCurrentRoleInfo(cur) {
      this.formData = cur
    },
  },
  methods: {
    ...mapActions('role-management', [
      'addRole',
      'updateRole',
      'getAllRoleList',
    ]),
    ...mapMutations('role-management', [SET_MODAL_SHOW, SET_CURRENT_INDEX]),
    ok() {
      this.addOrEditRole(this.$refs.form.form)
    },
    close() {
      this.$refs.form.reset()
      this[SET_MODAL_SHOW]({ key: 'role', isShow: false })
      this[SET_CURRENT_INDEX]({ index: null })
    },
    // 新增 or 编辑
    async addOrEditRole(data) {
      // true add false edit
      this.loading = true
      if (this.isAdd) {
        await this.addRole(data)
      } else {
        await this.updateRole(data)
      }
      this.loading = false
      this[SET_MODAL_SHOW]({ key: 'role', isShow: false })
      this.getAllRoleList()
    },
    // 父组件调用子组件show方法
    showModal(index) {
      this[SET_CURRENT_INDEX]({ index })
      this[SET_MODAL_SHOW]({ key: 'role', isShow: true })
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
  max-height: calc(100vh - 400px);
  .content {
    padding: 0 50px;
  }
}
</style>
