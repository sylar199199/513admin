import * as types from '@store/modules/add-course/mutation-types'

export default {
  [types.SET_SCHOOL_STUDENT](state, { addCourseList }) {
    state.addCourseList = addCourseList
  },
  [types.SET_ADD_SELECT](state, { addCourseListSelect }) {
    state.addCourseListSelect = addCourseListSelect
  },
  [types.SET_SIGN_COURSE](state, { AddCourseDetail }) {
    state.AddCourseDetail = AddCourseDetail
  },
  [types.SET_ADD_PARAMS](
    state,
    { addOrganizationParamsCourse, addOrganizationParamsSchool },
  ) {
    state.addOrganizationParamsCourse = addOrganizationParamsCourse
    state.addOrganizationParamsSchool = addOrganizationParamsSchool
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
}
