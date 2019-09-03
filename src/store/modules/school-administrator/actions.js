import * as types from '@store/modules/school-administrator/mutation-types'
import qs from 'qs'
import { $message } from '@/element'

export default {
  async getAllManagerList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getAllManagerList, {
      status: '0',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_MANAGERLIST,
        managerList: res.data,
      })
    }
  },
  async resetManagerPassword({}, sign) {
    return await this.$ajax.post(this.$apis.resetManagerPassword, { sign })
  },
  async updateManagerStatus({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.updateManagerStatus, data)
    if (res.ok)
      dispatch(
        'getAllManagerList',
        qs.parse(rootState.route.query.search) || {},
      )
    return res.ok
  },
  async addSchoolAdministrator({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.addSchoolAdministrator, data)
    if (res.ok) {
      $message.success('添加成功')
      dispatch(
        'getAllManagerList',
        qs.parse(rootState.route.query.search) || {},
      )
    } else {
      $message.error('添加失败')
    }
    return res.ok
  },
  async updateSchoolAdministrator({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(
      this.$apis.updateSchoolAdministrator,
      data,
    )
    if (res.ok) {
      $message.success('修改成功')
      dispatch(
        'getAllManagerList',
        qs.parse(rootState.route.query.search) || {},
      )
    } else {
      $message.error('修改失败')
    }
  },
  async getSchoolAdministratorById({ commit, rootState }, { sign, key }) {
    const res = await this.$ajax.post(this.$apis.getSchoolAdministratorById, {
      sign,
    })
    if (res.ok) {
      commit({
        type: types.SET_CURRENT_SCHOOL_ADMINISTRATOR,
        currentSchoolAdministrator: res.data,
        allDepartment: rootState['institution-setting'].departmentList,
        key,
      })
    }
    return res.ok
  },
  /**
   * 获取学校 关联销售（新增）
   *
   * @returns
   */
  async getSchoolAllAdministrator({ commit }) {
    const res = await this.$ajax.post(this.$apis.getSchoolAllAdministrator, {})
    if (res.ok) {
      commit({
        type: types.SET_SALES_LIST,
        salesList: res.data,
      })
    }
  },
  /**
   * 获取学校 关联销售（编辑）
   *
   * @returns
   */
  async getUpdateSchoolAllAdministrator({ commit }, schoolIdSign) {
    const res = await this.$ajax.post(this.$apis.getSchoolAllAdministrator, {
      name: '',
      schoolIdSign,
    })
    if (res.ok) {
      commit({
        type: types.SET_SALES_LIST,
        salesList: res.data,
      })
    }
  },
}
