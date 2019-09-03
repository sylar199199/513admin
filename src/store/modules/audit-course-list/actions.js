import * as types from '@store/modules/audit-course-list/mutation-types'
import qs from 'qs'

export default {
  async getAllAuditList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getAllAuditList, {
      auditStatus: 0,
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_AUDIT_COURSE_LIST,
        auditList: res.data,
      })
    }
  },
  async updateCourseAuditStatus({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.updateCourseAuditStatus, data)
    if (res.ok)
      dispatch('getAllAuditList', qs.parse(rootState.route.query.search) || {})
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
