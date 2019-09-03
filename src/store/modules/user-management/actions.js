import * as types from '@store/modules/user-management/mutation-types'
import qs from 'qs'

export default {
  /**
   * 根据条件获取所有的用户列表
   * @param {*} { commit }
   * @param {*} [terms={}] terms 条件
   */
  async getAllUsersList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getAllUsersList, {
      bindFlag: '0',
      status: '0',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_USER_LIST_DATA,
        data: res.data,
      })
    }
  },
  /**
   * 获取用户总数
   * @param {*} { commit }
   */
  async getUserCount({ commit }) {
    const res = await this.$ajax.get(this.$apis.getUserCount)
    if (res.ok) {
      commit({
        type: types.SET_USER_COUNT,
        userCounts: res.data,
      })
    }
  },
  /**
   * 获取用户绑定的角色信息
   * @param {*} { commit }
   * @param {*} sign 用户的签名
   */
  async getUserRoleInfo({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getUserRoleInfo, { sign })
    if (res.ok) {
      commit({
        type: types.SET_USER_ROLE_INFO,
        userRoleInfo: res.data,
        sign,
      })
    }
    return res.ok
  },
  /**
   * 解绑用户角色
   * @param {*} {}
   * @param {*} sign 角色签名
   */
  async unbindUserRole({ commit, dispatch, rootState, state }, sign) {
    const res = await this.$ajax.post(this.$apis.unbindUserRole, { sign })
    if (res.ok) {
      if (res.data === 0) {
        commit({
          type: types.SET_MODAL_SHOW,
          methods: 'bind',
          isShow: false,
        })
        dispatch(
          'getAllUsersList',
          qs.parse(rootState.route.query.search) || {},
        )
      } else {
        dispatch('getUserRoleInfo', state.currentSign)
      }
    }
    return res
  },
  /**
   * 更新用户状态
   * @param {*} { dispatch, rootState }
   * @param {*} data { sign , status }
   * @returns 请求是否成功
   */
  async updateUserStatus({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.updateUserStatus, data)
    if (res.ok)
      dispatch('getAllUsersList', qs.parse(rootState.route.query.search) || {})
    return res.ok
  },
  /**
   * 重置用户密码
   * @param {*} {}
   * @param {*} sign 签名
   * @returns response
   */
  async resetUserPassword({}, sign) {
    const res = await this.$ajax.post(this.$apis.resetUserPassword, { sign })
    return res
  },
  /**
   * 根据签名获取用户详细信息
   * @param {*} { commit }
   * @param {*} sign 签名
   * @returns 是否获取成功
   */
  async getByUsersId({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getByUsersId, { sign })
    if (res.ok) {
      commit({
        type: types.SET_USER_DETAIL,
        userDetail: res.data,
      })
    }
    return res.ok
  },
}
