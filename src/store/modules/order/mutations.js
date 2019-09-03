import * as types from '@store/modules/order/mutation-types'

export default {
  [types.SET_ORDER_LIST](state, { orderList }) {
    state.orderList = orderList
  },
  [types.SET_TOTAL_NUM](state, { total }) {
    state.total = parseInt(total)
  },
}
