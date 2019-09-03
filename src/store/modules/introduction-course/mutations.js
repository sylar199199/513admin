import * as types from '@store/modules/introduction-course/mutation-types'

export default {
  [types.SET_COURSE_LIST](state, { courseList }) {
    state.courseList = courseList
  },
  [types.SET_INTRODUCE_LIST](state, { introduceTeacherList }) {
    state.introduceTeacherList = introduceTeacherList
  },
  [types.SET_INTRODUCE_TOTAL](state, { total }) {
    state.total = parseInt(total)
  },
  [types.SET_MODAL_TEACHER](state, { key, isShow }) {
    state.showTeacher[key] = isShow
  },
}
