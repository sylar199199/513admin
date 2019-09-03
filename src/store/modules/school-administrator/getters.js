import { DepartmentRecursion } from '@utils'

export default {
  getDepartmentAndRole(state, getters, rootState) {
    const departRes = rootState['institution-setting'].departmentList
    const roleRes = rootState['role-management'].roleList
    return departRes.length && roleRes.length
      ? callback => callback(departRes, roleRes)
      : callback => callback(departRes, roleRes)
    // ? callback => callback(DepartmentRecursion(departRes), roleRes)
    // : () => {}
  },
}
