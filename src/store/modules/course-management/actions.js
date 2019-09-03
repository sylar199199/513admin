import * as types from '@store/modules/course-management/mutation-types'
import qs from 'qs'

export default {
  async getAllCourseList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getAllCourseList, {
      status: 0,
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_ALL_COURSE_LIST,
        courseList: res.data,
      })
    }
  },
  async updateCoruseStatus({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.updateCoruseStatus, data)
    if (res.ok)
      dispatch('getAllCourseList', qs.parse(rootState.route.query.search) || {})
    return res.ok
  },
  /**
   * 更改引进课程发布状态
   * @param {*} { rootState, dispatch }
   * @param {*} data
   * @returns
   */
  async updateReleaseLessionStatus({}, data) {
    const res = await this.$ajax.post(
      this.$apis.updateReleaseLessionStatus,
      data,
    )
    return res
  },
}
