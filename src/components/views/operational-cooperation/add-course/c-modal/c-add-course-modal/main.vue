<template>
  <el-dialog
    title="新增"
    :visible.sync="showRelate.show"
    :close-on-click-modal="false"
    @close="cancel"
    width="1000px"
    top="10vh"
  >
    <!--<div class="content">
      <base-form
        :form-data="formData"
        :rules="rules"
        :form-configs="formConfigs"
        ref="form"
      />
    </div>-->
    <div class="course-context">
      <el-row class="course-detail">
        <el-col :span="4">
          <span>课程图片 :</span>
        </el-col>
        <el-col :span="4">
          <span>
            <img
              :src="courseDetailData && courseDetailData.coursePicture"
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
      <!--<el-form ref="form" :model="form" label-width="">
        <el-form-item
          label="供课方式有如下三种，可多选，请根据实际合作内容配置："
        >
          <el-checkbox-group v-model="form.type">
            <br />
            <el-checkbox
              label="推荐为平台精选课，若产生订单，平台获得10%分成"
              name="type"
            ></el-checkbox>
            <br />
            <el-checkbox
              label="设置为平台VIP课程，提供给会员用户免费学习"
              name="type"
            ></el-checkbox>
            <br />
            <el-checkbox
              label="跨校课程合作，需添加受方校企："
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>-->
      <c-table-2 />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="add">
        添加合作机构
      </el-button>
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
import CTable2 from '@components/views/operational-cooperation/add-course/c-table-2'

export default {
  name: 'c-student-modal',
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
    ...mapState('school-student', {
      // modal框显示隐藏依赖的数据
      showRelate: ({ show, addOrEdit }) => {
        return {
          show: show.addOrEdit,
          modalType: addOrEdit,
        }
      },
    }),
    ...mapState('add-course', {
      // 课程数据
      courseDetailData: state => {
        return state.AddCourseDetail[0]
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
    ...mapMutations('school-student', [
      SET_MODAL_RELATE,
      RESET_CURRENT_STUDENT,
    ]),
    add() {
      this.courseIdSign = this.courseIdSignState
      this.providerSign = this.provideIdSignState
      this.$router.push({
        path: `/operationalCooperation/add-course/cooperativeOrganization/${
          this.courseIdSign
        }/${this.providerSign}`,
      })
    },
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
