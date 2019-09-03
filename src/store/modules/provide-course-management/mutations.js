import * as types from '@store/modules/provide-course-management/mutation-types'

export default {
  [types.SET_PROVIDE_LIST](state, { privoieCourseList }) {
    state.privoieCourseList = privoieCourseList
  },
  /**
   * 设置modal相关数据
   * @param {*} state
   * @param {*} { key, isShow, methord }
   */
  [types.SET_MODAL_RELATE](state, { key, isShow, methord }) {
    if (methord) state.addOrEdit = methord
    state.show[key] = isShow
  },
}
