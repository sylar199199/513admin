import * as types from '@store/modules/log-management/mutation-types'

export default {
  async getEventTypeList() {
    const res = await this.$ajax.get(this.$apis.getEventTypeList)
    return res
  },
  async getLogList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getLogList, {
      type: '0',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_LOG_LIST,
        logList: res.data,
      })
    }
  },
}
