import * as types from '@store/modules/home/mutation-types'

export default {
  /**
   * 获取校企home数据
   * @param {*} { commit }
   */
  async getSchoolHomeData({ commit }) {
    const res = await this.$ajax.get(this.$apis.getSchoolHomeData)
    if (res.ok) {
      commit({
        type: types.SET_HOME_DATA,
        homeData: res.data,
        isAdministrator: false,
      })
      //更新首页顶部信息
      commit({
        type: types.SET_HOMEHEAD_DATA,
        totalPaneData: res.data.indexCountVo,
        isAdministrator: false,
      })
      //更新首页校企信息
      commit({
        type: types.SET_SCHOOL_ENTERPRISE,
        schoolEnterpriseData: res.data.schoolDetailsVo,
        isAdministrator: false,
      })
      //更新首页通知公告信息
      commit({
        type: types.SET_NOTICE_ENTERPRIS,
        noticeList: res.data.bulletinListVoList,
        isAdministrator: false,
      })
    }
  },
  /**
   * 获取平台home数据
   * @param {*} { commit }
   */
  async getplatformHomeData({ commit }) {
    const res = await this.$ajax.get(this.$apis.getplatformHomeData)
    if (res.ok) {
      commit({
        type: types.SET_HOME_DATA,
        homeData: res.data,
        isAdministrator: true,
      })
      commit({
        type: types.SET_HOME_SECOND,
        totalSecond: res.data.indexCountVo,
        isAdministrator: true,
      })
    }
  },
}
