import * as types from './mutation-types'

export default {
  [types.SET_VERIFICODE](state, { verifiCode }) {
    state.verifiCode = window.URL.createObjectURL(verifiCode)
  },
  [types.SET_USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo
  },
  // 设置login状态
  [types.SET_LOGIN_STATE](state, { isLogin }) {
    state.isLogin = isLogin
  },
  // 设置logout状态
  [types.SET_LOGOUT_STATE](state, { logoutState }) {
    state.logoutState = logoutState
  },
  // 设置用户权限菜单(暂时不做过滤与第三级菜单)
  [types.SET_MENU_LIST](state, { menuList }) {
    let thirdPermission = []
    state.menuList = menuList.map(item => {
      let children = null
      if (item.hasOwnProperty('gradeTwo') && item.gradeTwo.length)
        children = item.gradeTwo
      if (item.hasOwnProperty('gradeThree')) {
        thirdPermission = [...thirdPermission, ...item.gradeThree]
      }
      return {
        ...item.gradeOne[0],
        children,
      }
    })
    state.thirdPermission = thirdPermission
  },
}
