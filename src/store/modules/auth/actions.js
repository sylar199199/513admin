import * as types from './mutation-types'
import { $message } from '@/element'
import cookieUtils from '@utils/cookie'

export default {
  /**
   * login登陆
   * accountData {code:验证码, account:账户, password:密码}
   */
  async login({}, accountData) {
    const res = await this.$ajax.post(this.$apis.login, accountData)
    if ((res.hasOwnProperty('code') && res.code === -1002) || res.ok) {
      if (typeof res.data === 'string') $message.success(res.data)
    }
    return res.ok
  },
  /**
   * 获取验证码
   * @param {*} { commit }
   */
  async getVerifiCode({ commit }) {
    const res = await this.$ajax.getBlob(this.$apis.getVerifiCode, true, {
      throttle: 'verifyCode',
    })
    if (res.ok) {
      commit({
        type: types.SET_VERIFICODE,
        verifiCode: res.data,
      })
    }
  },
  /**
   * 获取用户信息
   * @param {*} { commit }
   */
  async getLoginInfo({ dispatch, commit }) {
    const res = await this.$ajax.get(this.$apis.getLoginInfo)
    if (res.ok) {
      // 设置用户信息
      // TODO:目前返回的是json格式，后期会改成纯对象形式
      await dispatch('getUserMenuGrade')
      commit({
        type: types.SET_USER_INFO,
        userInfo: Array.isArray(res.data) ? res.data[0] : res.data,
      })
      commit({
        type: types.SET_LOGIN_STATE,
        isLogin: true,
      })
    }
    return res
  },
  /**
   * 登出
   * @param {*} {}
   * @param {*} routerContext 路由模块
   */
  async loginOut({ commit }, routerContext) {
    const res = await this.$ajax.get(this.$apis.loginOut)
    if (res.ok) {
      commit({
        type: types.SET_LOGOUT_STATE,
        logoutState: true,
      })
      cookieUtils.setCookie('isLogin', 0, -1)
      if (process.env.VUE_APP_CURRENTMODE === 'production') {
        window.location.href = '/login'
      } else {
        setTimeout(() => {
          routerContext.replace('/login')
          window.location.reload()
        }, 50)
      }
    }
  },
  async getUserMenuGrade({ commit }) {
    const res = await this.$ajax.get(this.$apis.getMenuGrade)
    if (res.ok) {
      commit({
        type: types.SET_MENU_LIST,
        menuList: res.data,
      })
    }
  },
}
