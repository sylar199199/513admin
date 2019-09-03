import * as types from '@store/modules/base-details/mutation-types'
import { $message } from '@/element'
import qs from 'qs'

export default {
  /**
   * 获取我的信息
   */
  async getSelectByManagerId({ commit }) {
    const res = await this.$ajax.get(this.$apis.selectByManagerId)
    if (res.ok) {
      commit({
        type: types.SET_MYDETAILS_INFO,
        myDetails: res.data,
      })
    }
  },
  /**
   * 更新我的信息
   * @param {*} { dispatch, rootState }
   * @param {*} 表单数据
   * @returns 修改是否成功
   */
  async updateManagerId({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.updateManagerId, data)
    return res
  },
  async updateAccountPassword({ dispatch, rootState }, data) {
    const res = await this.$ajax.post(this.$apis.updateAccountPassword, data)
    if (res.ok) {
      return 1
    }
  },
}
