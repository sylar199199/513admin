import * as types from '@store/modules/school-student/mutation-types'
import { $message } from '@/element'
import qs from 'qs'

export default {
  /**
   * 根绝条件获取所有的学生列表
   * @param {*} { commit }
   * @param {*} [terms={}] terms 条件
   */
  async getAllStudentList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getAllStudentList, {
      status: '0',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_SCHOOL_STUDENT,
        schoolStudentList: res.data,
      })
    }
  },
  /**
   * 更新学生状态
   * @param {*} { dispatch, rootState }
   * @param {*} sign 教师签名
   * @returns 修改是否成功
   */
  async updateStudentStatus({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.updateStudentStatus, data)
    if (res.ok) {
      $message.success('修改状态成功！')
      dispatch(
        'getAllStudentList',
        qs.parse(rootState.route.query.search) || {},
      )
    }
    return res.ok
  },
  /**
   * 添加学生
   * @param {*} { dispatch, rootState }
   * @param {*} data { studentName, studentCard }
   * @returns 请求成功或者失败
   */
  async addStudent({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.addStudent, data)
    if (res.ok) {
      $message.success('添加成功')
      dispatch(
        'getAllStudentList',
        qs.parse(rootState.route.query.search) || {},
      )
    } else {
      $message.error('添加失败')
    }
    return res.ok
  },
  /**
   * 更新学生
   * @param {*} { state, dispatch, rootState }
   * @param {*} data { studentName, studentCard }
   * @returns 请求成功或者失败
   */
  async updateStudent({ state, dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.updateStudent, {
      ...data,
      idSign: state.currentStudent.idSign,
    })
    if (res.ok) {
      $message.success('修改成功')
      dispatch(
        'getAllStudentList',
        qs.parse(rootState.route.query.search) || {},
      )
    } else {
      $message.error('修改失败')
    }
    return res.ok
  },
  /**
   * 根据sign获取学生详情
   * @param {*} { commit }
   * @param {*} idSign 签名
   * @returns 请求成功或者失败
   */
  async getStudentById({ commit }, idSign) {
    const res = await this.$ajax.post(this.$apis.getStudentById, {
      idSign,
    })
    if (res.ok) {
      commit({
        type: types.SET_CURRENT_STUDENT,
        currentStudent: res.data,
      })
    }
    return res.ok
  },
  /**
   * 获取学生模板下载地址
   * @param {*} { commit }
   */
  async getDownloadUrl({ commit }) {
    const res = await this.$ajax.get(this.$apis.getDownloadUrl)
    if (res.ok) {
      commit({
        type: types.SET_STUDENT_URL,
        studentUrl: res.data,
      })
    }
  },
}
