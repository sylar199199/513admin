import * as types from '@store/modules/base-details/mutation-types'

export default {
  /**
   * 设置modal相关数据
   * @param {*} state
   * @param {*} { key, isShow, methord }
   */
  [types.SET_MODAL_RELATE](state, { key, isShow, methord }) {
    if (methord) state.addOrEdit = methord
    state.show[key] = isShow
  },
  [types.SET_PASSWORD_MODAL](state, { key, isShow }) {
    state.showPassword[key] = isShow
  },
  [types.SET_IMAGE_RELATE](state, { setimageUrl }) {
    state.myDetails.portraitImage = setimageUrl
  },
  /**
   * 获取我的信息
   */
  [types.SET_MYDETAILS_INFO](state, { myDetails }) {
    state.myDetails = myDetails
  },
}
