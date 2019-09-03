import * as types from '@store/modules/role-management/mutation-types'
import { $message } from '@/element'

const createCollectChecked = list => {
  return function collectChecked(arr) {
    return arr.map(item => {
      const flag = item.level === '0' || item.level === '1'
      if (!flag && item.checked) list.push(item.sign)
      let disabled = flag
      if (item.children) {
        return {
          ...item,
          // disabled,
          children: collectChecked(item.children),
        }
      } else {
        return { ...item /*, disabled*/ }
      }
    })
  }
}

export default {
  /**
   * 获取所有role
   * @param {*} { commit }
   */
  async getAllRoleList({ commit }) {
    const res = await this.$ajax.get(this.$apis.getRoleList)
    if (res.ok) {
      commit({
        type: types.SET_ROLE_LIST,
        roleList: res.data,
      })
    }
  },
  /**
   * 新增role
   * @param {*} roleInfo { name , description }
   * @returns
   */
  async addRole({}, roleInfo) {
    const res = await this.$ajax.post(this.$apis.addRole, roleInfo)
    if (res.ok) $message.success(res.data)
    return res.ok
  },
  /**
   *更新role
   * @param {*} { description, sign, name }
   * @returns true false
   */
  async updateRole({}, { description, sign, name }) {
    const res = await this.$ajax.post(this.$apis.updateRole, {
      description,
      idSign: sign,
      name,
    })
    if (res.ok) $message.success(res.data)
    return res.ok
  },

  /**
   * 获取角色权限树
   * @param {*} { commit }
   * @param {*} idSign role 签名
   */
  async getRoleTreeView({ commit }, idSign) {
    const res = await this.$ajax.post(this.$apis.getRoleTreeView, idSign)
    if (res.ok) {
      let list = []
      commit({
        type: types.SET_ROLE_TREE_VIEW,
        roleTree: {
          treeView: createCollectChecked(list)(res.data.treeView),
          defaultChecked: list,
        },
      })
    }
  },
  /**
   * 设置权限
   * @param {*} { commit, dispatch }
   * @param {*} permissionList 变动的三级权限数组
   */
  async setRolePermission({ commit, dispatch }, permissionList) {
    const res = await this.$ajax.post(
      this.$apis.setRolePermission,
      permissionList,
    )
    if (res.ok) {
      $message.success('修改成功')
      commit({
        type: types.SET_TREE_INIT,
      })
      dispatch('getAllRoleList')
    }
  },
  /**
   * 删除role
   * @param {*} { dispatch, commit }
   * @param {*} idSign role sign
   * @returns
   */
  async deleteRole({ dispatch, commit }, idSign) {
    const res = await this.$ajax.post(this.$apis.deleteRole, { idSign })
    if (res.ok) {
      // 重新获取所有的role列表
      dispatch('getAllRoleList')
      $message.success('删除角色成功')
      commit({
        type: types.SET_TREE_INIT,
      })
      // 重新获取所有数据
      dispatch('getAllRoleList')
    }
    return res.ok
  },
  /**
   * 获取角色关联的账号列表
   * @param {*} { commit }
   * @param {*} idSign id签名
   */
  async getRoleAccountList({ commit }, idSign) {
    const res = await this.$ajax.post(this.$apis.gitRoleAccountList, {
      idSign,
    })
    if (res.ok) {
      commit({
        type: types.SET_ACCOUNT_LIST,
        accountList: res.data,
      })
    }
  },
}
