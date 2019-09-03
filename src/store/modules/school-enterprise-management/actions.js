import * as types from '@store/modules/school-enterprise-management/mutation-types'
import qs from 'qs'

// school-enterprise-management-action 模块的action
export default {
  /**
   * 根绝条件获取所有的校企列表
   * @param {*} { commit }
   * @param {*} [terms={}] terms 条件
   */
  async getAllSchoolList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getSchoolList, {
      type: '0',
      status: '0',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_ACCOUNT_LIST_DATA,
        accountListData: res.data,
      })
    }
  },
  /**
   * 更新某一校企状态
   * @param {*} { dispatch, rootState }
   * @param {*} data { sign, status } { 签名, 状态:<true|false> }
   * @returns
   */
  async updateSchoolStatus({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.updateSchoolStatus, data)
    if (res.ok)
      dispatch('getAllSchoolList', qs.parse(rootState.route.query.search) || {})
    return res.ok
  },
  /**
   * 重置校企密码
   * @param {*} {}
   * @param {*} sign 校企签名
   * @returns {...,ok,data} {...,是否成功,修改后生成的密码数据}
   */
  async resetSchoolPassword({}, sign) {
    const res = await this.$ajax.post(this.$apis.resetSchoolPassword, { sign })
    return res
  },
  async addSchool({ rootState, dispatch }, data) {
    const res = await this.$ajax.post(this.$apis.addSchool, data)
    if (res.ok)
      dispatch('getAllSchoolList', qs.parse(rootState.route.query.search) || {})
    return res.ok
  },
  /**
   * 根据sign获取校企详情
   * @param {*} { commit }
   * @param {*} sign 签名
   */
  async getSchoolById({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getSchoolById, { sign })
    if (res.ok) {
      commit({
        type: types.SET_CURRENT_SCHOOL_DATA,
        currentSchoolData: res.data,
      })
    }
    return res.ok
  },
  /**
   * 更新校企信息
   * @param {*} { rootState, dispatch }
   * @param {*} data 校企数据
   * @returns 是否成功
   */
  async updateSchool({ rootState, dispatch }, data) {
    const res = await this.$ajax.post(this.$apis.updateSchool, data)
    if (res.ok)
      dispatch('getAllSchoolList', qs.parse(rootState.route.query.search) || {})
    return res.ok
  },
  /**
   * 获取校企认证资料
   * @param {*} {}
   * @param {*} sign
   * @returns res
   */
  async getAuthDataById({}, sign) {
    return await this.$ajax.post(this.$apis.getAuthDataById, { sign })
  },
  async addAuthData({}, data) {
    const res = await this.$ajax.post(this.$apis.addAuthData, data)
    return res.ok
  },
  async updateAuthData({}, data) {
    const res = await this.$ajax.post(this.$apis.updateAuthData, data)
    return res.ok
  },
}
