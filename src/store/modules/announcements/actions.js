import * as types from '@store/modules/announcements/mutation-types'
import qs from 'qs'

export default {
  /**
   * 获取所有系统公告
   * @param {*} { commit }
   * @param {*} [terms={}] 条件
   */
  async getAllBulletin({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getAllBulletin, {
      status: '0',
      msgType: '3',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_BULLETIN_LIST,
        bulletinList: res.data,
      })
    }
  },
  /**
   * 获取所有校内公告
   * @param {*} { commit }
   * @param {*} [terms={}] 条件
   */
  async getschoolBulletin({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getAllBulletin, {
      status: '0',
      msgType: '1',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_BULLETIN_LIST,
        bulletinList: res.data,
      })
    }
  },
  /**
   * 获取所有课程公告
   * @param {*} { commit }
   * @param {*} [terms={}course] 条件
   */
  async getcourseBulletin({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getAllBulletin, {
      status: '0',
      msgType: '2',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_BULLETIN_LIST,
        bulletinList: res.data,
      })
    }
  },
  /**
   * 更新公告状态
   * @param {*} { dispatch, rootState }
   * @param {*} data 数据 { status,sign }
   * @returns 是否成功
   */
  async updateBulletinStatus({ dispatch, rootState }, data) {
    const { status, sign } = data
    const res = await this.$ajax.post(this.$apis.updateBulletinStatus, {
      status,
      sign,
    })
    if (res.ok) {
      if (data.notifyType === '3') {
        dispatch('getAllBulletin', qs.parse(rootState.route.query.search) || {})
      } else if (data.notifyType === '2') {
        dispatch(
          'getcourseBulletin',
          qs.parse(rootState.route.query.search) || {},
        )
      } else if (data.notifyType === '1') {
        dispatch(
          'getschoolBulletin',
          qs.parse(rootState.route.query.search) || {},
        )
      }
      return res.ok
    }
  },
  /**
   * 删除公告
   * @param {*} { dispatch, rootState }
   * @param {*} sign 签名
   * @returns 是否成功
   */
  async deleteBulletin({ dispatch, rootState }, data) {
    const { sign } = data
    const res = await this.$ajax.post(this.$apis.deleteBulletin, { sign })
    if (res.ok) {
      console.log('data', data.notifyType)
      if (data.notifyType === '3') {
        dispatch('getAllBulletin', qs.parse(rootState.route.query.search) || {})
      } else if (data.notifyType === '2') {
        dispatch(
          'getcourseBulletin',
          qs.parse(rootState.route.query.search) || {},
        )
      } else if (data.notifyType === '1') {
        dispatch(
          'getschoolBulletin',
          qs.parse(rootState.route.query.search) || {},
        )
      }
      return res
    }
  },
  /**
   * 获取公告详情
   * @param {*} { }
   * @param {*} sign 签名
   * @returns 是否成功
   */
  async getBulletinById({ commit }, sign) {
    let res = await this.$ajax.post(this.$apis.getBulletinById, { sign })
    if (res.ok) {
      commit({
        type: types.SET_BULLET_TYPE,
        bulletType: res.data,
      })
      return res
    }
  },
  async addBulletin({}, data) {
    return await this.$ajax.post(this.$apis.addBulletin, data)
  },
  async updateBulletin({}, data) {
    return await this.$ajax.post(this.$apis.updateBulletin, data)
  },
  async getDownSchool() {
    return await this.$ajax.get(this.$apis.getDownSchool)
  },
  async selectCourseDrop() {
    return await this.$ajax.get(this.$apis.getCourseList)
  },
  async addMessage({}, data) {
    let res = await this.$ajax.post(this.$apis.addMessageInfo, data)
    if (res.ok) {
      return res
    }
  },
  /**
   * 首页公告详情
   * @returns 是否成功
   */
  async getAllHomePage({ commit }) {
    const res = await this.$ajax.get(this.$apis.getAllHomePage)
    if (res.ok) {
      commit({
        type: types.SET_INDEX_NOTICE,
        noticeList: res.data,
      })
    }
  },
  /**
   * 首页公告详情
   * @returns 是否成功
   */
  async getMyNotifyList({ commit }, title) {
    const res = await this.$ajax.getList(this.$apis.getAllSystemMsgList, {
      status: '0',
      msgType: '0',
      title: title,
    })
    if (res.ok) {
      commit({
        type: types.SET_MY_NOTICE,
        myNofityList: res.data,
      })
    }
  },
  /**
   * 首页公告详情
   * @returns 是否成功
   */
  async getMyNotifyPost({ commit }, numSizeObj) {
    const res = await this.$ajax.post(this.$apis.getAllSystemMsgList, {
      msgType: '0',
      page: numSizeObj.page,
      size: numSizeObj.size,
      status: '0',
    })
    if (res.ok) {
      commit({
        type: types.SET_MY_NOTICE,
        myNofityList: res.data,
      })
    }
  },
}
