<template>
  <div>
    <div class="main">
      <div class="course-infovo">
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone"> 课程图片 :</span>
          </div>
          <el-button @click="$router.go(-1)" type="default" class="back-style">
            返回
          </el-button>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>
              <img
                :src="courseInfoVo && courseInfoVo.coursePicture"
                width="400"
                height="300"
              />
            </span>
          </el-col>
        </el-row>
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone">
              课程名称 : {{ courseInfoVo && courseInfoVo.courseName }}
            </span>
          </div>
        </el-row>
        <el-row class="course-detail">
          <el-col :span="12">
            <div style="display: flex;">
              <div class="buleIcon"></div>
              <span class="titile-fone">
                审核状态 :
                {{ (courseInfoVo && courseInfoVo.audit_status) || '未审核' }}
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone">
              是否为精选课程: {{ courseInfoVo && courseInfoVo.boutiqueCourse }}
            </span>
          </div>
        </el-row>
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone">
              课程详情介绍 :
              {{ courseInfoVo && courseInfoVo.courseDescribe }}
            </span>
          </div>
        </el-row>
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone">
              课程注意事项 :
              {{ courseInfoVo && courseInfoVo.courseNotice }}
            </span>
          </div>
        </el-row>
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone">
              价格 : {{ courseInfoVo && courseInfoVo.coursePrice }}
            </span>
          </div>
        </el-row>
        <el-row>
          <el-row>
            <div style="display: flex;">
              <div class="buleIcon"></div>
              <span class="titile-fone">
                学分 : {{ courseInfoVo && courseInfoVo.courseScore }}
              </span>
            </div>
          </el-row>
        </el-row>
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone">
              课程时长 : {{ courseInfoVo && courseInfoVo.courseTime }}
            </span>
          </div>
        </el-row>
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone">
              知识点 : {{ courseInfoVo && courseInfoVo.knowledge }}
            </span>
          </div>
        </el-row>
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone">
              发布状态 : {{ courseInfoVo && courseInfoVo.releaseStatus }}
            </span>
          </div>
        </el-row>
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone">
              学校名 : {{ courseInfoVo && courseInfoVo.schoolName }}
            </span>
          </div>
        </el-row>
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone">
              课程类型 : {{ courseInfoVo && courseInfoVo.type }}
            </span>
          </div>
        </el-row>
        <el-row>
          <el-col :span="12" class="teacharIntro">
            <span class="font-content"> </span>
          </el-col>
        </el-row>
      </div>
      <div
        v-for="(item, key) in courseInfoVoList"
        :key="key"
        class="course-infovo-list"
      >
        <el-row style="">
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone"> 老师头像 :</span>
          </div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="headImg teacharIntro">
              <img
                :src="item.teacherImage"
                width="200"
                height="150"
                class="avatar"
              />
            </span>
          </el-col>
        </el-row>
        <el-row>
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <el-col>
              <span class="titile-fone">
                老师名称 : {{ item.teacherName }}</span
              >
            </el-col>
          </div>
        </el-row>
        <el-row>
          <div style="display: flex; margin-top: 20px">
            <div class="buleIcon"></div>
            <span class="titile-fone"> 老师介绍 : {{ item.introduction }}</span>
          </div>
        </el-row>
        <el-row style="margin-top: 10px">
          <div style="display: flex;">
            <div class="buleIcon"></div>
            <span class="titile-fone"> 学校名称 : {{ item.schoolName }}</span>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapState('course-detail', {
      courseInfoVo: state => state.courseDetail.courseInfoVo,
      courseInfoVoList: state => state.courseDetail.courseTeacherVoList,
    }),
  },
  methods: {
    ...mapActions('course-detail', ['getCourseById']),
    tranaudiaStatus: audiaStatus => (audiaStatus === '2' ? '未审核' : '已审核'),
  },
  async mounted() {
    if (!(await this.getCourseById(this.$route.params.courseId))) {
      const parentRoute = this.$route.matched[this.$route.matched.length - 2]
      this.$router.push((parentRoute && parentRoute.path) || '/')
    }
  },
}
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  /*justify-content: flex-start;*/
  .course-infovo-list {
    margin-left: 100px;
  }
}
.buleIcon {
  width: 8px;
  height: 16px;
  background: #409eff;
}
.home {
}
.course-detail {
}
.course-infovo {
  margin-left: 60px;
  > div {
    margin-bottom: 15px;
  }
}
.titile-fone {
  margin-left: 10px;
  font-weight: bold;
}
course-infovo-list {
  position: absolute;
  float: left;
  > div {
    margin-bottom: 15px;
  }
}
span {
  font-size: 16px;
}
.headImg {
  margin-bottom: 15px;
  margin-left: 30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px #eee solid;
  display: inline-block;
  margin-right: 30px;
  overflow: hidden;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
.font-content {
  border-bottom: #cccccc solid 1px;
  font-size: 14px;
  line-height: 22px;
}
.teacharIntro {
  margin-top: 10px;
}
.back-style {
  position: fixed;
  top: 158px;
  right: 62px;
}
</style>
