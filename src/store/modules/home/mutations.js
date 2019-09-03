import * as types from '@store/modules/home/mutation-types'

export default {
  [types.SET_HOME_DATA](state, { homeData, isAdministrator }) {
    state.bulletinList = homeData.bulletinListVoList
    if (isAdministrator) {
      state.registerUserCountList = homeData.registerUserCountVoList
      state.totalHomeData = homeData.indexCountVo
      state.indexCount = homeData.schoolCountVoMap
      state.courseCount = homeData.courseCountVoMap
    } else {
      state.schoolDetails = homeData.schoolDetailsVo
      state.indexCount = homeData.indexCountVoMap
      state.completionStatisticsData = homeData.indexCountTwoVoMap
    }
  },
  // 设置首页头部的信息
  [types.SET_HOMEHEAD_DATA](state, { totalPaneData }) {
    state.totalPaneData = totalPaneData
  },
  // 设置首页通知的信息(管理员)
  [types.SET_HOME_SECOND](state, { totalSecond }) {
    state.totalSecond = totalSecond
  },
  // 设置校企的信息
  [types.SET_SCHOOL_ENTERPRISE](state, { schoolEnterpriseData }) {
    state.schoolEnterpriseData = schoolEnterpriseData
  },
  // 设置首页通知的信息
  [types.SET_NOTICE_ENTERPRIS](state, { noticeList }) {
    state.noticeList = noticeList
  },
}
