import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  name: 'school-enterprise-management',
  config: {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  },
}
