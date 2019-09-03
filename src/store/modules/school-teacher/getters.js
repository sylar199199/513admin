import { DepartmentRecursion } from '@utils'

export default {
  getDepartment(state, getters, rootState) {
    const departRes = rootState['institution-setting'].departmentList
    return departRes.length
      ? callback => callback(departRes)
      : callback => callback(DepartmentRecursion(departRes))
    // return departRes.length
    //   ? callback => callback(departRes)
    // : () => {}
  },
}
