<template>
  <el-dialog
    :title="showRelate.modalType === 'add' ? '新增校务员' : '修改校务员'"
    :visible.sync="showRelate.show"
    :close-on-click-modal="false"
    @close="cancel"
    width="600px"
    top="5vh"
  >
    <div class="content">
      <base-form
        :form-data="formData"
        :rules="rules"
        :form-configs="createConfig(formConfigs)"
        ref="form"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="ok">
        确 定
      </el-button>
      <el-button :loading="loading" @click="cancel">
        取 消
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import BaseForm from '@components/base/base-form'
import {
  formConfigs,
  formData,
  rules,
} from '@components/views/school-management/school-administrator/c-modal/c-manager-modal/form-config'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import {
  SET_MODAL_RELATE,
  RESET_CURRENT_SCHOOL_ADMINISTRATOR,
} from '@store/modules/school-administrator/mutation-types'

export default {
  name: 'c-manager-modal',
  components: {
    'base-form': BaseForm,
  },
  data() {
    return {
      dialogVisible: false,
      formConfigs,
      formData,
      rules,
      loading: false,
    }
  },
  computed: {
    ...mapState('school-administrator', {
      // modal框显示隐藏依赖的数据
      showRelate: ({ show, addOrEdit }) => {
        return {
          show: show.addOrEdit,
          modalType: addOrEdit,
        }
      },
      // 当前编辑的校务员信息
      currentSchoolAdministrator: ({ currentSchoolAdministrator }) =>
        currentSchoolAdministrator,
    }),
    ...mapGetters('school-administrator', {
      createConfig: 'getDepartmentAndRole',
    }),
  },
  // 监听current校务员的变化，并且赋值
  watch: {
    currentSchoolAdministrator({
      name,
      phone,
      departmentName,
      roleName,
      address,
      email,
      remark,
      idSign,
    }) {
      this.formData = {
        name,
        phone,
        departmentName,
        roleName,
        address,
        email,
        remark,
        idSign,
      }
    },
  },
  methods: {
    ...mapActions('school-administrator', [
      'addSchoolAdministrator',
      'updateSchoolAdministrator',
    ]),
    ...mapMutations('school-administrator', [
      SET_MODAL_RELATE,
      RESET_CURRENT_SCHOOL_ADMINISTRATOR,
    ]),
    ok() {
      // 校验
      this.$refs.form.validate(async data => {
        this.loading = true
        if (this.showRelate.modalType === 'add') {
          delete data.idSign
          await this.addSchoolAdministrator({
            ...data,
            departmentName: data.departmentName[data.departmentName.length - 1],
          })
        } else {
          await this.updateSchoolAdministrator({
            ...data,
            departmentName: data.departmentName[data.departmentName.length - 1],
          })
        }
        this.cancel()
        this.loading = false
      })
    },
    // 取消
    cancel() {
      // 如果是编辑状态，重置编辑获取的校务员信息
      if (this.showRelate.modalType === 'edit') {
        this[RESET_CURRENT_SCHOOL_ADMINISTRATOR]()
      }
      this.$refs.form.reset()
      this[SET_MODAL_RELATE]({
        isShow: false,
        key: 'addOrEdit',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.c-manager-modal {
}
</style>
