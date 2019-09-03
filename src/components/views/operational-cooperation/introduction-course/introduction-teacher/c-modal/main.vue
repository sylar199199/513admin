<template>
  <el-dialog
    title="新增关联"
    :visible.sync="showRelate.show"
    :close-on-click-modal="false"
    @close="cancel"
    width="600px"
    top="5vh"
  >
    <div class="content">
      <el-form :rules="rules" :model="ruleForm" ref="ruleForm">
        <el-form-item label="选择教师" prop="introductionTeacher">
          <el-select
            v-model="ruleForm.introductionTeacher"
            filterable
            placeholder="可输入关键字搜索"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="ok('ruleForm')">
          确 定
        </el-button>
        <el-button :loading="loading" @click="cancel">
          取 消
        </el-button>
      </span>
    </div>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { SET_MODAL_TEACHER } from '@store/modules/introduction-course/mutation-types'

export default {
  name: 'c-introduction-modal',
  props: {
    nowPage: Number,
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      options: [],
      ruleForm: {
        introductionTeacher: '',
      },
      rules: {
        introductionTeacher: [
          { required: true, message: '请选择关联教师', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState('introduction-course', {
      // modal框显示隐藏依赖的数据
      showRelate: ({ showTeacher, addOrEdit }) => {
        return {
          show: showTeacher.addOrEdit,
        }
      },
    }),
  },
  methods: {
    ...mapActions('introduction-course', [
      'getDownTeacher',
      'addIntroduceTeacherList',
      'getAllIntroduceTeacherList',
    ]),
    ...mapMutations('introduction-course', [SET_MODAL_TEACHER]),
    ok(formName) {
      // 校验
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            courseIdSign: this.$route.query.id,
            teacherIdSign: this.ruleForm.introductionTeacher,
          }
          const res = this.addIntroduceTeacherList(params)
          this.cancel()
          this.getAllIntroduceTeacherList({
            page: this.nowPage,
            size: 10,
            courseIdSign: this.$route.query.id,
          })
        }
      })
    },
    // 取消
    cancel() {
      this[SET_MODAL_TEACHER]({
        isShow: false,
        key: 'addOrEdit',
      })
      this.ruleForm.introductionTeacher = ''
    },
    async init() {
      const params = {
        schoolIdSign: this.$route.query.schoolIdSign,
      }
      const res = await this.getDownTeacher(params)
      this.options = res.map(key => {
        return {
          label: `${key.teacherName}- ${key.teacherCard}`,
          value: key.sign,
        }
      })
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss" scoped>
.c-student-modal {
}
</style>
