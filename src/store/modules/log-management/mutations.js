import * as types from '@store/modules/log-management/mutation-types'

export default {
  [types.SET_LOG_LIST](state, { logList }) {
    state.logList = logList
  },
}
