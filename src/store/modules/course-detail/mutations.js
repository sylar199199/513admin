import * as types from '@store/modules/course-detail/mutation-types'

export default {
  [types.SET_COURSE_DETAIL](state, { courseDetail }) {
    state.courseDetail = courseDetail
  },
  [types.SET_MODAL_RELATE](state, { isShow }) {
    state.show = isShow
  },
  [types.SET_DETAILS_ID](state, { idDetails }) {
    state.idDetails = idDetails
  },
}
