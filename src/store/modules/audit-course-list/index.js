import state from './state'
import mutations from './mutations'
import actions from './actions'

export default {
  name: 'audit-course-list',
  config: {
    namespaced: true,
    state,
    mutations,
    actions,
  },
}
