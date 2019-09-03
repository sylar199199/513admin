import state from './state'
import mutations from './mutations'
import actions from './actions'

export default {
  name: 'course-management',
  config: {
    namespaced: true,
    state,
    mutations,
    actions,
  },
}
