import * as types from '@store/modules/institution-setting/mutation-types'

export default {
  [types.SET_DEPARTMENT_TREE](state, { departmentList }) {
    state.departmentList = departmentList
  },
}
