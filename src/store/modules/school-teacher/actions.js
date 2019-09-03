import * as types from '@store/modules/school-teacher/mutation-types'
import { $message } from '@/element'
import qs from 'qs'

export default {
  /**
   * 根绝条件获取所有的教师列表
   * @param {*} { commit }
   * @param {*} [terms={}] terms 条件
   */
  async getAllTeacherLists({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getAllTeacherLists, {
      status: '0',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_TEACHER_LIST,
        teacherList: res.data,
      })
    }
  },
  /**
   * 更新教师状态
   * @param {*} { dispatch, rootState }
   * @param {*} sign 教师签名
   * @returns 修改是否成功
   */
  async updateTeacherStatus({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.updateTeacherStatus, data)
    if (res.ok) {
      $message.success('修改状态成功')
      dispatch(
        'getAllTeacherLists',
        qs.parse(rootState.route.query.search) || {},
      )
    }
    return res.ok
  },
  async addTeacher({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.addTeacher, data)
    if (res.ok) {
      $message.success('添加成功')
      dispatch(
        'getAllTeacherLists',
        qs.parse(rootState.route.query.search) || {},
      )
    } else {
      $message.error('添加失败')
    }
    return res.ok
  },
  async updateTeacher({ state, dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.updateTeacher, {
      ...data,
      idSign: state.currentTeacher.idSign,
    })
    if (res.ok) {
      $message.success('修改成功')
      dispatch(
        'getAllTeacherLists',
        qs.parse(rootState.route.query.search) || {},
      )
    } else {
      $message.error('修改失败')
    }
    return res.ok
  },
  async getTeacherById({ commit, rootState }, { idSign, key }) {
    const res = await this.$ajax.post(this.$apis.getTeacherById, {
      idSign,
    })
    if (res.ok) {
      commit({
        type: types.SET_CURRENT_TEACHER,
        currentTeacher: res.data,
        allDepartment: rootState['institution-setting'].departmentList,
        key,
      })
    }
    return res.ok
  },
  /**
   * 获取老师模板下载地址
   * @param {*} { commit }
   */
  async getTeacherDownloadUrl({ commit }) {
    const res = await this.$ajax.get(this.$apis.getTemplateURL)
    if (res.ok) {
      commit({
        type: types.SET_TEACHER_URL,
        teacherUrl: res.data,
      })
    }
  },
}
