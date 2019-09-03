import * as types from './mutation-types'
import { $message } from '@/element'

export default {
  async uploadFile({}, data) {
    return await this.$ajax.post(this.$apis.upload, data)
  },
}
