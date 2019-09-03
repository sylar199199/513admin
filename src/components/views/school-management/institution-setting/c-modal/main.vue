<template>
  <el-dialog
    :title="modalType === 'add' ? '新增部门' : '编辑部门'"
    :visible.sync="dialogVisible"
    @close="modalClose"
    width="50%"
    top="15vh"
  >
    <div class="content">
      <base-form
        :form-data="_formData"
        :rules="rules"
        :form-configs="configs"
        ref="form"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ok">
        保 存
      </el-button>
      <el-button @click="modalClose">
        关 闭
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
} from '@components/views/school-management/institution-setting/c-modal/form-configs'
import { mapActions } from 'vuex'

export default {
  name: 'c-modal',
  components: {
    'base-form': BaseForm,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    modalType: {
      type: String,
      default: 'add',
    },
    currentFormData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      formConfigs,
      formData,
      rules,
    }
  },
  computed: {
    _show() {
      return this.show
    },
    _formData() {
      return {
        ...this.formData,
        parentDepartmentName: this.currentFormData.departmentName,
      }
    },
    configs() {
      return this.formConfigs(true, this.modalType)
    },
  },
  watch: {
    _show(cur) {
      this.dialogVisible = cur
    },
  },
  methods: {
    ...mapActions('institution-setting', ['addDepartment', 'updateDepartment']),
    ok() {
      this.$refs.form.validate(async data => {
        // 新增状态
        if (this.modalType === 'add') {
          const newDepartmentData = this.currentFormData.sign
            ? {
                parentSign: this.currentFormData.sign,
                departmentName: data.departmentName,
              }
            : {
                departmentName: data.departmentName,
              }
          const ok = await this.addDepartment(newDepartmentData)
          if (ok) this.$message.success('新增部门成功')
        } else {
          await this.updateDepartment({
            departmentName: data.departmentName,
            sign: this.currentFormData.sign,
          })
        }
      })
      this.modalClose()
      setTimeout(() => {
        this.$emit('handle-reload')
      }, 100)
    },
    modalClose() {
      this.$refs.form.reset()
      this.$nextTick(() => {
        this.$emit('handle-change')
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
