import * as types from '@store/modules/audit-course-list/mutation-types'

export default {
  [types.SET_AUDIT_COURSE_LIST](state, { auditList }) {
    state.auditList = auditList
  },
}
