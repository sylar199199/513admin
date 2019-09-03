import * as types from '@store/modules/course-management/mutation-types'

export default {
  [types.SET_ALL_COURSE_LIST](state, { courseList }) {
    state.courseList = courseList
  },
}
