<template>
  <el-dialog
    :title="showRelate.modalType === 'add' ? '新增学生' : '修改学生'"
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
        :form-configs="formConfigs"
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
} from '@components/views/source-management/school-student/c-modal/c-student-modal/form-config'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import {
  SET_MODAL_RELATE,
  RESET_CURRENT_STUDENT,
} from '@store/modules/school-student/mutation-types'

export default {
  name: 'c-student-modal',
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
    ...mapState('school-student', {
      // modal框显示隐藏依赖的数据
      showRelate: ({ show, addOrEdit }) => {
        return {
          show: show.addOrEdit,
          modalType: addOrEdit,
        }
      },
      // 当前编辑的校务员信息
      currentStudent: ({ currentStudent }) => currentStudent,
    }),
  },
  // 监听current校务员的变化，并且赋值
  watch: {
    currentStudent({ studentCard, studentName }) {
      this.formData = {
        studentCard,
        studentName,
      }
    },
  },
  methods: {
    ...mapActions('school-student', ['addStudent', 'updateStudent']),
    ...mapMutations('school-student', [
      SET_MODAL_RELATE,
      RESET_CURRENT_STUDENT,
    ]),
    ok() {
      // 校验
      this.$refs.form.validate(async data => {
        this.loading = true
        if (
          await this[
            this.showRelate.modalType === 'add' ? 'addStudent' : 'updateStudent'
          ](data)
        )
          this.cancel()
        this.loading = false
      })
    },
    // 取消
    cancel() {
      // 如果是编辑状态，重置编辑获取的校务员信息
      if (this.showRelate.modalType === 'edit') {
        this[RESET_CURRENT_STUDENT]()
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
.c-student-modal {
}
</style>
