import * as types from '@store/modules/my-course/mutation-types'
import qs from 'qs'

export default {
  async getMyCourseList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getMyCourseList, {
      status: '0',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_COURSE_LIST,
        courseList: res.data,
      })
    }
  },
  /**
   * / 根据签名获取该课程合作信息
   * @param {*} { commit }
   * @param {*} [terms={}] terms 条件
   */
  async getCooperateDetailById({ commit }, params) {
    const res = await this.$ajax.post(this.$apis.getCooperateDetailById, {
      courseIdSign: params.courseIdSign,
    })
    if (res.ok) {
      commit({
        type: types.SET_COOPERATE_DEATIL,
        cooperateDetail: res.data,
      })
    }
  },
}
