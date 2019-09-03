import * as types from '@store/modules/provide-course-management/mutation-types'

export default {
  async getProvideCourseManagement({ commit }, terms = {}) {
    const res = await this.$ajax.getList(
      this.$apis.getProvideCourseManagement,
      { status: '0', ...terms },
    )
    if (res.ok) {
      commit({
        type: types.SET_PROVIDE_LIST,
        privoieCourseList: res.data,
      })
    }
  },
}
