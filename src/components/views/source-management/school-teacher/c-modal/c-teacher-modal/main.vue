<template>
  <el-dialog
    :title="showRelate.modalType === 'add' ? '新增教师' : '修改教师'"
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
} from '@components/views/source-management/school-teacher/c-modal/c-teacher-modal/form-config'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import {
  SET_MODAL_RELATE,
  RESET_CURRENT_TEACHER,
} from '@store/modules/school-teacher/mutation-types'

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
    ...mapState('school-teacher', {
      // modal框显示隐藏依赖的数据
      showRelate: ({ show, addOrEdit }) => {
        return {
          show: show.addOrEdit,
          modalType: addOrEdit,
        }
      },
      // 当前编辑的校务员信息
      currentTeacher: ({ currentTeacher }) => currentTeacher,
    }),
    ...mapGetters('school-teacher', {
      createConfig: 'getDepartment',
    }),
  },
  // 监听current校务员的变化，并且赋值
  watch: {
    currentTeacher({
      teacherName,
      teacherCard,
      departmentName,
      teacherTitle,
      introduction,
    }) {
      this.formData = {
        teacherName,
        teacherCard,
        departmentName,
        teacherTitle,
        introduction,
      }
    },
  },
  methods: {
    ...mapActions('school-teacher', ['addTeacher', 'updateTeacher']),
    ...mapMutations('school-teacher', [
      SET_MODAL_RELATE,
      RESET_CURRENT_TEACHER,
    ]),
    async ok() {
      let data = this.$refs.form.form
      this.loading = true
      if (
        await this[
          this.showRelate.modalType === 'add' ? 'addTeacher' : 'updateTeacher'
        ]({
          ...data,
          departmentName: data.departmentName[data.departmentName.length - 1],
        })
      )
        this.cancel()
      this.loading = false
    },
    // 取消
    cancel() {
      // 如果是编辑状态，重置编辑获取的校务员信息
      if (this.showRelate.modalType === 'edit') {
        this[RESET_CURRENT_TEACHER]()
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
.c-teacher-modal {
}
</style>
