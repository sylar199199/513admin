import * as types from '@store/modules/order/mutation-types'
import { $message } from '@/element'
import qs from 'qs'

export default {
  /**
   * 根据条件获取所有的订单列表
   * @param {*} { commit }
   * @param {*} [terms={}] terms 条件
   */
  async orderList({ commit }, params) {
    const res = await this.$ajax.post(this.$apis.orderList, params)
    if (res.ok) {
      commit({
        type: types.SET_ORDER_LIST,
        orderList: res.data,
      })
      commit({
        type: types.SET_TOTAL_NUM,
        total: res.data.total,
      })
    }
  },
  async getSchoolList({}) {
    const res = await this.$ajax.get(this.$apis.getDownSchool)
    if (res.ok) {
      return res.data
    }
  },
  async exportOrder({}, params) {
    await this.$ajax.post(this.$apis.exportOrder, params)
  },
}
