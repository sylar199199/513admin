import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default {
  name: 'course-detail',
  config: {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  },
}
