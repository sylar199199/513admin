import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  name: 'introduction-course',
  config: {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  },
}
