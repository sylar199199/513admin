import * as types from '@store/modules/school-student/mutation-types'

export default {
  [types.SET_SCHOOL_STUDENT](state, { schoolStudentList }) {
    state.schoolStudentList = schoolStudentList
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
  [types.RESET_CURRENT_STUDENT](state) {
    state.currentStudent = {}
  },
  [types.SET_CURRENT_STUDENT](state, { currentStudent }) {
    state.currentStudent = currentStudent
  },
  [types.SET_STUDENT_URL](state, { studentUrl }) {
    state.studentUrl = studentUrl
  },
}
