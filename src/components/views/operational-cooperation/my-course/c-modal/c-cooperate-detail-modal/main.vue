<template>
  <el-dialog
    title="合作明细"
    :visible.sync="showRelate.show"
    :close-on-click-modal="false"
    @close="cancel"
    width="1000px"
    top="10vh"
  >
    <div class="course-context">
      <el-row class="course-detail">
        <el-col :span="4">
          <span>课程图片 :</span>
        </el-col>
        <el-col :span="4">
          <span>
            <img
              src="http://front.513online.top/front/hot_img_02%402x.png"
              width="200"
              height="150"
            />
          </span>
        </el-col>
      </el-row>
      <el-row class="course-detail">
        <el-col :span="2">
          <span>课程名称 :</span>
        </el-col>
        <el-col :span="4">
          <span>{{ courseDetailData && courseDetailData.courseName }}</span>
        </el-col>
        <el-col :span="2">
          <span>讲课老师 :</span>
        </el-col>
        <el-col :span="2">
          <span>{{ courseDetailData && courseDetailData.teacherName }}</span>
        </el-col>
        <el-col :span="2">
          <span>学分 :</span>
        </el-col>
        <el-col :span="2">
          <span>{{ courseDetailData && courseDetailData.courseScore }}</span>
        </el-col>
        <el-col :span="2">
          <span>课时 :</span>
        </el-col>
        <el-col :span="2">
          <span>{{ courseDetailData && courseDetailData.courseTime }}</span>
        </el-col>
      </el-row>
      <c-table-2 />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="cancel">
        关 闭
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {
  SET_MODAL_RELATE,
  RESET_CURRENT_STUDENT,
} from '@store/modules/school-student/mutation-types'
import CTable2 from '@components/views/operational-cooperation/my-course/c-table/c-detail-table'

export default {
  name: 'c-cooperate-detail-modal',
  components: {
    CTable2,
  },
  data() {
    return {
      loading: false,
      courseIdSign: '',
      providerSign: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    }
  },
  computed: {
    ...mapState('my-course', {
      // modal框显示隐藏依赖的数据
      showRelate: ({ show, addOrEdit }) => {
        return {
          show: show.addOrEdit,
          modalType: addOrEdit,
        }
      },
    }),
    ...mapState('my-course', {
      // 课程数据
      courseDetailData: state => {
        return state.cooperateDetail[0]
      },
      //合作机构数据
      courseIdSignState: state => {
        return state.addOrganizationParamsCourse
      },
      //合作机构数据
      provideIdSignState: state => {
        return state.addOrganizationParamsSchool
      },
    }),
  },
  // 监听current校务员的变化，并且赋值
  watch: {},
  methods: {
    ...mapActions('school-student', ['addStudent', 'updateStudent']),
    ...mapMutations('my-course', [SET_MODAL_RELATE, RESET_CURRENT_STUDENT]),
    // 取消
    cancel() {
      this[SET_MODAL_RELATE]({
        isShow: false,
        key: 'addOrEdit',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.course-context {
  margin-left: 50px;
}
.course-detail {
  font-size: 16px;
  margin-bottom: 15px;
}
</style>
