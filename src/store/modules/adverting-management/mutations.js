import * as types from '@store/modules/adverting-management/mutation-types'

export default {
  [types.SET_ADVERTING_LIST](state, { advertingList }) {
    state.advertingList = advertingList
  },
  [types.SET_ADVERTING_RELATE](state, { key, isShow, methord }) {
    if (methord) state.addOrEdit = methord
    state.show[key] = isShow
  },
  [types.SET_IMAGE_RELATE](state, { setimageUrl }) {
    state.advertingDetails.advertImage = setimageUrl
  },
  [types.SET_ADVERTING_DETAILS](state, { advertingDetails }) {
    state.advertingDetails = advertingDetails
  },
  [types.RESET_CURRENT_ADVERTING](state) {
    state.advertingDetails = {
      advertImage: '',
    }
  },
  [types.DISPLAY_ADVERTING_DETAILS](state, { key, isShow }) {
    state.show[key] = isShow
  },
}
