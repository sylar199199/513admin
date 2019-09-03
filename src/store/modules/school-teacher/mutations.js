import * as types from '@store/modules/school-teacher/mutation-types'
import { getDepartmentArr } from '@utils'

export default {
  [types.SET_TEACHER_LIST](state, { teacherList }) {
    state.teacherList = teacherList
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
  [types.RESET_CURRENT_TEACHER](state) {
    state.currentTeacher = {}
  },
  [types.SET_CURRENT_TEACHER](state, { currentTeacher, allDepartment, key }) {
    const arr = []
    getDepartmentArr(key, arr)(allDepartment)
    state.currentTeacher = {
      ...currentTeacher,
      departmentName: arr[0] || [],
    }
  },
  [types.SET_TEACHER_URL](state, { teacherUrl }) {
    state.teacherUrl = teacherUrl
  },
}
