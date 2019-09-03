import * as types from './mutation-types'

export default {
  async getIndexView({}) {
    const res = await this.$ajax.get(this.$apis.getIndexView)
    return res
  },
  async updateIndex({}, data) {
    const res = await this.$ajax.post(this.$apis.updateIndex, data)
    return res.ok
  },
  async addDateIndex({}, data) {
    const res = await this.$ajax.post(this.$apis.addDateIndex, data)
    return res.ok
  },
}
