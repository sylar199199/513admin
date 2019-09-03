<template>
  <div>
    <div>
      <div v-if="isAdministrator">
        <el-col :span="4">
          <el-row class="c-total-pane">
            <el-col :span="12">
              <img :src="schoolPicture" alt="" class="icon-header" />
            </el-col>
            <el-col :span="12">
              <p class="count">
                {{ totalHomeData.schoolCount }}
              </p>
              <p class="name">
                入驻校企
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row class="c-total-pane">
            <el-col :span="12">
              <img :src="onlineCourse" alt="" class="icon-header" />
            </el-col>
            <el-col :span="12">
              <p class="count">
                {{ totalHomeData.courseCount }}
              </p>
              <p class="name">
                在线课程
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row class="c-total-pane">
            <el-col :span="12">
              <img :src="boutiqueCourse" alt="" class="icon-header" />
            </el-col>
            <el-col :span="12">
              <p class="count">
                {{ totalHomeData.boutiqueCourseCount }}
              </p>
              <p class="name">
                精选课程
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row class="c-total-pane">
            <el-col :span="12">
              <img :src="userCount" alt="" class="icon-header" />
            </el-col>
            <el-col :span="12">
              <p class="count">
                {{ totalHomeData.userCount }}
              </p>
              <p class="name">
                会员用户
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row class="c-total-pane">
            <el-col :span="12">
              <img :src="userToDayCount" alt="" class="icon-header" />
            </el-col>
            <el-col :span="12">
              <p class="count">
                {{ totalHomeData.userToDayCount }}
              </p>
              <p class="name">
                今日注册
              </p>
            </el-col>
          </el-row>
        </el-col>
      </div>
      <div v-else>
        <el-col :span="4">
          <el-row class="c-total-pane">
            <el-col class="img-box-1" :span="12">
              <img :src="one" one alt="" class="icon" />
            </el-col>
            <el-col :span="12">
              <p class="count">
                {{ totalPaneData.one }}
              </p>
              <p class="name">
                待审批课程
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-row class="c-total-pane">
            <el-col :span="12" class="img-box-2">
              <img :src="three" alt="" class="icon" />
            </el-col>
            <el-col :span="12">
              <p class="count">
                {{ totalPaneData.three }}
              </p>
              <p class="name">
                引进课程
              </p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-row class="c-total-pane">
            <el-col :span="12" class="img-box-3">
              <img :src="two" alt="" class="icon-header" />
            </el-col>
            <el-col :span="12">
              <p class="count">
                {{ totalPaneData.two }}
              </p>
              <p class="name">
                校内课程
              </p>
            </el-col>
          </el-row>
        </el-col>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'c-total-pane',
  data() {
    return {
      schoolPicture: process.env.VUE_APP_PICTURE_URL + 'icon_01%402x.png',
      onlineCourse: process.env.VUE_APP_PICTURE_URL + 'icon_05%402x.png',
      boutiqueCourse: process.env.VUE_APP_PICTURE_URL + 'icon_06%402x.png',
      userCount: process.env.VUE_APP_PICTURE_URL + 'icon_07%402x.png',
      userToDayCount: process.env.VUE_APP_PICTURE_URL + 'icon_08%402x.png',
      one: process.env.VUE_APP_PICTURE_URL + 'icon_01%402x.png',
      two: process.env.VUE_APP_PICTURE_URL + 'icon_03%402x.png',
      three: process.env.VUE_APP_PICTURE_URL + 'icon_02%402x.png',
    }
  },
  computed: {
    ...mapState('home', {
      totalPaneData: state => state.totalPaneData,
    }),
    ...mapState('home', {
      totalHomeData: state => state.totalSecond,
    }),
    ...mapState('auth', {
      isAdministrator: state =>
        state.userInfo && state.userInfo.roleStr === 'administrator',
    }),
  },
}
</script>
<style lang="scss" scoped>
.c-total-pane {
  height: 90px;
  border: 1px solid #cccccc;
  padding: 10px 15px;
  box-sizing: border-box;
  p {
    line-height: 35px;
    font-size: 20px;
    text-align: center;
    &.count {
      font-weight: bold;
    }
  }
  .name {
    line-height: 35px;
    font-size: 16px;
    text-align: center;
    &.count {
      font-weight: bold;
    }
  }
}
.icon {
  display: block;
  margin: auto;
  margin-top: 5px;
}
.icon-header {
  display: block;
  margin: auto;
  margin-top: 4px;
}
</style>
