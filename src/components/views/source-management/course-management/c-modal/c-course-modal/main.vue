<template>
  <el-dialog
    title="修改课程排序精选"
    :visible.sync="showRelate"
    :close-on-click-modal="false"
    @close="cancel"
    width="600px"
    top="5vh"
  >
    <div class="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否为精选课程" prop="boutiqueCourse">
          <el-radio-group v-model="form.boutiqueCourse">
            <el-radio :label="true">
              是
            </el-radio>
            <el-radio :label="false">
              否
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { SET_MODAL_RELATE } from '@store/modules/course-detail/mutation-types'

export default {
  name: 'c-student-modal',
  components: {},
  data() {
    return {
      dialogVisible: false,
      loading: false,
      form: {
        sort: '',
        boutiqueCourse: null,
      },
      rules: {
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState('course-detail', {
      // modal框显示隐藏依赖的数据
      showRelate: state => {
        return state.show
      },
      // 当前编辑的课程信息
      idDetails: state => state.idDetails,
    }),
  },
  watch: {
    idDetails({ boutiqueCourse, sort }) {
      this.form = {
        sort,
        boutiqueCourse,
      }
    },
  },
  methods: {
    ...mapActions('course-detail', ['updateCourse']),
    ...mapActions('course-management', ['getAllCourseList']),
    ...mapMutations('course-detail', [SET_MODAL_RELATE]),
    async ok() {
      await this.updateCourse(this.form)
      this.cancel()
      await this.getAllCourseList()
    },
    // 取消
    cancel() {
      this[SET_MODAL_RELATE]({
        isShow: false,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.c-student-modal {
}
</style>
