import * as types from './mutation-types'

export default {
  [types.SET_FIRST_LEVEL_ACTIVE](state, { first_level_active }) {
    state.first_level_active = first_level_active
  },
}
