import * as types from '@store/modules/my-course/mutation-types'

export default {
  [types.SET_COURSE_LIST](state, { courseList }) {
    state.courseList = courseList
  },
  [types.SET_MODAL_RELATE](state, { key, isShow, methord }) {
    if (methord) state.addOrEdit = methord
    state.show[key] = isShow
  },
  [types.SET_COOPERATE_DEATIL](state, { cooperateDetail }) {
    state.cooperateDetail = cooperateDetail
  },
}
