import * as types from '@store/modules/school-administrator/mutation-types'
import { getDepartmentArr } from '@utils'

export default {
  /**
   * 设置校务员列表
   * @param {*} state
   * @param {*} { managerList } 校务员列表
   */
  [types.SET_MANAGERLIST](state, { managerList }) {
    state.managerList = managerList
  },
  /**
   * 设置modal相关数据
   * @param {*} state
   * @param {*} { key, isShow, methord }
   */
  [types.SET_MODAL_RELATE](state, { key, isShow, methord }) {
    if (methord) state.addOrEdit = methord
    state.show[key] = isShow
  },
  /**
   * 设置当前编辑的校务员信息
   * @param {*} state
   * @param {*} { currentSchoolAdministrator, allDepartment, key }
   */
  [types.SET_CURRENT_SCHOOL_ADMINISTRATOR](
    state,
    { currentSchoolAdministrator, allDepartment, key },
  ) {
    const arr = []
    getDepartmentArr(key, arr)(allDepartment)
    state.currentSchoolAdministrator = {
      ...currentSchoolAdministrator,
      departmentName: arr[0] || [],
    }
  },
  /**
   * 重置当前编辑的校务员信息
   * @param {*} state
   */
  [types.RESET_CURRENT_SCHOOL_ADMINISTRATOR](state) {
    state.currentSchoolAdministrator = {}
  },
  [types.SET_SALES_LIST](state, { salesList }) {
    state.salesList = salesList
  },
}
