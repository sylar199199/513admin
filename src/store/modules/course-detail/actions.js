import * as types from '@store/modules/course-detail/mutation-types'
import { $message } from '../../../element'

export default {
  async getCourseById({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getCourseById, { sign })
    if (res.ok) {
      commit({
        type: types.SET_COURSE_DETAIL,
        courseDetail: res.data,
      })
    }
    return res.ok
  },
  async getDetailsbyId({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getCourseId, { sign })
    if (res.ok) {
      commit({
        type: types.SET_DETAILS_ID,
        idDetails: res.data,
      })
    }
    return res.ok
  },
  async updateCourse({ state }, data) {
    const res = await this.$ajax.post(this.$apis.updateCourse, {
      idSign: state.idDetails.idSign,
      ...data,
    })
    if (res.ok) {
      $message.success('修改成功')
    }
  },
}
