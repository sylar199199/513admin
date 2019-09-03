<template>
  <div class="home">
    <el-row :gutter="25">
      <c-total-pane />
    </el-row>
    <el-row style="margin-top: 35px" class="content" :gutter="35">
      <el-col :span="16">
        <el-row :gutter="10">
          <el-col :span="12">
            <c-school-survey />
          </el-col>
          <el-col :span="12">
            <!--课程统计-->
            <c-course-statistics v-if="isAdministrator" />
            <!--校企概况-->
            <c-completion-statistics v-else />
          </el-col>
        </el-row>
        <el-row class="daily-new">
          <el-col>
            <c-daily-new />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8" v-if="!isAdministrator" class="enterprise">
        <!--校企信息-->
        <c-school-enterprise />
      </el-col>
      <el-col :span="8">
        <!--通知公告-->
        <c-notice-enterpris />
        <c-notify-modal />
      </el-col>
      <!-- <el-col :span="8" class="daily-new">
        &lt;!&ndash;审批信息&ndash;&gt;
        <c-approval-message />
      </el-col>-->
    </el-row>
  </div>
</template>
<script>
import CApprovalMessage from '@components/views/home/c-approval-message'
import CNoticeEnterpris from '@components/views/home/c-notice-enterpris'
import CSchoolEnterprise from '@components/views/home/c-school-enterprise'
import CTotalPane from '@components/views/home/c-total-pane'
import CSchoolSurvey from '@components/views/home/c-school-survey'
import CCourseStatistics from '@components/views/home/c-course-statistics'
import CDailyNew from '@components/views/home/c-daily-new'
import CCompletionStatistics from '@components/views/home/c-completion-statistics'
import { mapActions, mapState } from 'vuex'
import CNotifyModal from '@components/views/educational-process/my-notify/c-modal/c-manager-modal'

export default {
  name: 'home',
  components: {
    /*'c-approval-message': CApprovalMessage,*/
    'c-notice-enterpris': CNoticeEnterpris,
    'c-total-pane': CTotalPane,
    'c-school-survey': CSchoolSurvey,
    'c-course-statistics': CCourseStatistics,
    'c-daily-new': CDailyNew,
    'c-completion-statistics': CCompletionStatistics,
    'c-school-enterprise': CSchoolEnterprise,
    'c-notify-modal': CNotifyModal,
  },
  computed: {
    ...mapState('auth', {
      isAdministrator: state =>
        state.userInfo && state.userInfo.roleStr === 'administrator',
    }),
    ...mapState('home', {
      totalPaneData: state => {
        let totalPaneDataArr = []
        let totalPaneDataObj = {}
        for (let key in state.totalPaneData) {
          totalPaneDataObj = { panName: key, panNum: state.totalPaneData[key] }
          totalPaneDataArr.push(totalPaneDataObj)
        }
        return totalPaneDataArr
      },
    }),
  },
  methods: {
    ...mapActions('home', ['getSchoolHomeData', 'getplatformHomeData']),
  },
  mounted() {
    this[
      (this.isAdministrator && 'getplatformHomeData') || 'getSchoolHomeData'
    ]()
  },
}
</script>
<style lang="scss" scoped>
.home {
  padding: 20px;
  .content {
    margin-top: 15px;
    .daily-new {
      margin-top: 15px;
    }
  }
  .enterprise {
    margin-bottom: 15px;
  }
}
</style>
