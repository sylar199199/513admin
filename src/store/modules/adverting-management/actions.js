import * as types from '@store/modules/adverting-management/mutation-types'
import qs from 'qs'
import { $message } from '@/element'

export default {
  async getAdvertingList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getAdvertingList, {
      content: '0',
      status: '0',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_ADVERTING_LIST,
        advertingList: res.data,
      })
    }
  },
  // 添加广告
  async addAdverting({ commit }, params) {
    const res = await this.$ajax.post(this.$apis.addAdverting, {
      url: params.url,
      advertImage: params.advertImage,
      type: params.type,
      effectiveTime: params.effectiveTime,
      expiryTime: params.expiryTime,
      content: params.content,
      courseId: params.courseId,
      sort: params.sort,
      title: params.title,
    })
    return res.ok
  },
  // 编辑广告
  async updateAdverting({ state }, params) {
    const res = await this.$ajax.post(this.$apis.updateAdverting, {
      url: params.url,
      advertImage: params.advertImage,
      type: params.type,
      effectiveTime: params.effectiveTime,
      expiryTime: params.expiryTime,
      content: params.content,
      courseId: params.courseId,
      sort: params.sort,
      title: params.title,
      idSign: state.advertingDetails.idSign,
    })
    return res.ok
  },
  // 删除广告
  async deleteAdvertising({ dispatch, rootState }, sign) {
    const res = await this.$ajax.post(this.$apis.deleteAdvertising, { sign })
    return res
  },
  // 获取广告详情
  async getAdverListById({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getByAdvertisingId, {
      sign,
    })
    if (res.ok) {
      commit({
        type: types.SET_ADVERTING_DETAILS,
        advertingDetails: res.data,
      })
    }
  },
  async getAllCourseSelectList() {
    const res = await this.$ajax.get(this.$apis.selectCourseDrop)
    if (res.ok) {
      return res
    }
  },
  /**
   * 修改广告状态
   * @returns {Promise<*>}
   */
  async updateAdvertisingDeleteFlag({ dispatch, rootState }, data) {
    console.log('data', data)
    const res = await this.$ajax.post(
      this.$apis.updateAdvertisingDeleteFlag,
      data,
    )
    if (res.ok) {
      $message.success('修改成功')
      dispatch('getAdvertingList', qs.parse(rootState.route.query.search) || {})
    } else {
      $message.error('修改失败')
    }
  },
}
