import * as types from '@store/modules/introduction-course/mutation-types'
import qs from 'qs'

export default {
  /**
   * 获取引进课程列表
   * @param {*} { commit }
   * @param {*} [terms={}] 查找条件
   */
  async getIntroductionCourseList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getIntroductionCourseList, {
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
   * 更改引进课程发布状态
   * @param {*} { rootState, dispatch }
   * @param {*} data
   * @returns
   */
  async updateReleaseStatus({}, data) {
    const res = await this.$ajax.post(this.$apis.updateReleaseStatus, data)
    return res
  },
  /**
   * 获取关联教师列表
   * @param {*} { commit }
   * @param {*} data
   * @returns
   */
  async getAllIntroduceTeacherList({ commit }, params) {
    const res = await this.$ajax.post(
      this.$apis.getAllIntroduceTeacherList,
      params,
    )
    if (res.ok) {
      commit({
        type: types.SET_INTRODUCE_LIST,
        introduceTeacherList: res.data,
      })
      commit({
        type: types.SET_INTRODUCE_TOTAL,
        total: res.data.total,
      })
    }
  },
  /**
   * 获取关联教师列表
   * @param {*} { commit }
   * @param {*} data
   * @returns
   */
  async getDownTeacher({}, params) {
    const res = await this.$ajax.post(this.$apis.getDownTeacher, params)
    if (res.ok) {
      return res.data
    }
  },
  /**
   * 添加关联教师列表
   * @param {*} data
   * @returns
   */
  async addIntroduceTeacherList({}, params) {
    const res = await this.$ajax.post(
      this.$apis.addIntroduceTeacherList,
      params,
    )
    if (res.ok) {
      return true
    }
  },
  /**
   * 添加删除教师
   * @param {*} data
   * @returns
   */
  async deleteIntroduceTeacher({}, params) {
    const res = await this.$ajax.post(this.$apis.deleteIntroduceTeacher, params)
    if (res.ok) {
      return true
    }
  },
}
