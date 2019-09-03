import * as types from '@store/modules/announcements/mutation-types'

export default {
  [types.SET_BULLETIN_LIST](state, { bulletinList }) {
    state.bulletinList = bulletinList
  },
  [types.SET_BULLET_TYPE](state, { bulletType }) {
    state.bulletType = bulletType
  },
  [types.SET_INDEX_NOTICE](state, { noticeList }) {
    state.noticeList = noticeList
  },
  [types.SET_MY_NOTICE](state, { myNofityList }) {
    state.myNofityList = myNofityList
  },
  [types.SET_MODAL_DETAIL](state, { key, isShow }) {
    state.show[key] = isShow
  },
}
