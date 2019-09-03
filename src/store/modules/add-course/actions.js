import * as types from '@store/modules/add-course/mutation-types'
import { $message } from '@/element'
import qs from 'qs'

export default {
  /**
   * 根据条件获取所有的课程列表
   * @param {*} { commit }
   * @param {*} [terms={}] terms 条件
   */
  async getAllAddCourseList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getAllAddCourseList, {
      status: '0',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_SCHOOL_STUDENT,
        addCourseList: res.data,
      })
    }
  },
  /**
   * 获取下拉选列表
   */
  async getAddCourseSelectlist({ commit }, providerSign) {
    const res = await this.$ajax.post(this.$apis.getAllAddCourseListSelect, {
      sign: providerSign,
    })
    return res
  },
  /**
   * 获取合作机构详情
   */
  async getAddCourseDetailFormlist({ commit }, data) {
    const resFormlist = await this.$ajax.post(
      this.$apis.getAddCourseDetailFormlist,
      {
        sign: data.sign,
      },
    )
    return resFormlist
  },
  /**
   * / 根据签名获取该课程信息
   * @param {*} { commit }
   * @param {*} [terms={}] terms 条件
   */
  async getAddCourseDetailById({ commit }, params) {
    const res = await this.$ajax.post(this.$apis.getAddCourseDetailById, {
      courseIdSign: params.courseIdSign,
      providerIdSign: params.providerIdSign,
    })
    if (res.ok) {
      commit({
        type: types.SET_SIGN_COURSE,
        AddCourseDetail: res.data,
      })
    }
  },
  /**
   * / 保存课程签名到state
   * @param {*} { commit }
   * @param {*} sign 条件
   */
  saveAddOrganizationParams({ commit }, params) {
    commit({
      type: types.SET_ADD_PARAMS,
      addOrganizationParamsCourse: params.courseIdSign,
      addOrganizationParamsSchool: params.providerIdSign,
    })
  },
  /**
   * / 添加合作机构
   * @param {*} params 保存参数
   *  @param {*} { commit }
   */
  async addCoueseIntroduce({ commit }, params) {
    const res = await this.$ajax.post(this.$apis.addCoueseIntroduce, {
      courseIdSign: params.courseIdSign,
      customerSign: params.customerSign,
      providerSign: params.providerSign,
      endTime: params.startTime,
      startTime: params.endTime,
    })
    if (res.ok) {
      $message.success('添加成功！')
    }
    return res.ok
  },
  /**
   * / 修改合作机构
   * @param {*} params 保存参数
   *  @param {*} { commit }
   */
  async updateCoueseIntroduce({ commit }, params) {
    const res = await this.$ajax.post(this.$apis.updateCoueseIntroduce, {
      courseIdSign: params.courseIdSign,
      customerSign: params.customerSign,
      providerSign: params.providerSign,
      idSign: params.isSign,
      endTime: params.startTime,
      startTime: params.endTime,
    })
    return res.ok
  },
  /**
   * 根据合作机构签名删除合作机构
   * @param {*} { dispatch, rootState }
   * @param {*} sign 合作机构签名
   */
  async deleteIntroduce({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.deleteIntroduce, {
      sign: data,
    })
    if (res.ok) {
      $message.success('删除成功！')
    }
    return res
  },
  /**
   * 更新合作机构状态
   * @param {*} { dispatch, rootState }
   * @param {*} sign 合作机构签名
   * @returns 修改是否成功
   */
  async updateAddcourseStatus({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(
      this.$apis.updateIntroduceListDeleteFlag,
      data,
    )
    return res.ok
  },
}
