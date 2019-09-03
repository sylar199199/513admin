<template>
  <el-dialog
    title="修改密码"
    :visible.sync="showRelate"
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
} from '@components/base/base-edit-password/form-config'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { SET_MODAL_RELATE } from '@store/modules/base-details/mutation-types'
import { SET_PASSWORD_MODAL } from '@store/modules/base-details/mutation-types'

export default {
  name: 'c-teacher-modal',
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
    ...mapState('base-details', {
      // modal框显示隐藏依赖的数据
      showRelate: state => {
        return state.showPassword.editPassword
      },
      myPassword: state => state.myPassword,
    }),
    ...mapGetters('school-teacher', {
      createConfig: 'getDepartment',
    }),
    // 当前编辑的校务员信息
    currentTeacher: ({ currentTeacher }) => currentTeacher,
  },
  watch: {
    myDetails({ name, schoolName, phone, email, address }) {
      this.formData = {
        name,
        schoolName,
        phone,
        email,
        address,
      }
    },
  },
  methods: {
    ...mapActions('base-details', ['updateAccountPassword']),
    ...mapMutations('base-details', [SET_MODAL_RELATE]),
    ...mapMutations('base-details', [SET_PASSWORD_MODAL]),
    async ok() {
      //确认
      let data = this.$refs.form.form
      this.loading = true
      let res = await this.updateAccountPassword({
        ...data,
      })
      if (res) {
        this.cancel()
      }
      this.loading = false
    },
    // 取消
    cancel() {
      // 如果是编辑状态，重置编辑获取的校务员信息
      this.$refs.form.reset()
      this[SET_PASSWORD_MODAL]({
        isShow: false,
        key: 'editPassword',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.c-teacher-modal {
}
</style>
