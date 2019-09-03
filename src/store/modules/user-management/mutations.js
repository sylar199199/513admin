import * as types from '@store/modules/user-management/mutation-types'

export default {
  /**
   * 设置用户列表信息
   * @param {*} state
   * @param {*} {
   *       data: { hasNextPage, hasPreviousPage, pages, total, size, list, pageNum },
   *     }
   */
  [types.SET_USER_LIST_DATA](state, { data }) {
    state.userListData = data
  },
  /**
   * 设置用户总数
   * @param {*} state
   * @param {*} { userCounts }
   */
  [types.SET_USER_COUNT](state, { userCounts }) {
    state.userCounts = userCounts
  },
  /**
   * 设置用户绑定角色信息
   * @param {*} state
   * @param {*} { userRoleInfo }
   */
  [types.SET_USER_ROLE_INFO](state, { userRoleInfo, sign }) {
    state.currentSign = sign
    const list = []
    Object.keys(userRoleInfo).forEach(key => {
      if (userRoleInfo[key]) {
        list.push({
          ...userRoleInfo[key],
          roleKey: key,
        })
      }
    })
    state.userRoleInfo = list
  },
  /**
   * 设置modal
   * @param {*} state
   * @param {*} { type, isShow } { modal类型, 是否显示}
   */
  [types.SET_MODAL_SHOW](state, { methods, isShow }) {
    switch (methods) {
      case 'bind':
        // 清除sign
        if (!isShow) state.currentSign = ''
        break

      default:
        break
    }
    state.show[methods] = isShow
  },
  /**
   * 设置用户详细信息
   * @param {*} state
   * @param {*} { userDetail }
   */
  [types.SET_USER_DETAIL](state, { userDetail }) {
    const config = {
      userName: '用户名',
      sex: '性别',
      phone: '手机号',
      email: '邮箱',
      remarks: '个性签名',
      schoolName: '学校名',
      bindFlag: '绑定状态',
      createTime: '创建时间',
      lastLoginTime: '最后登录时间',
      source: '来源',
    }
    const list = []
    Object.keys(config).forEach(key => {
      list.push({
        key: config[key],
        value: userDetail[key],
      })
    })
    state.userDetail = list
  },
}
