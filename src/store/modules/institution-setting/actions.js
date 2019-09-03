import * as types from '@store/modules/institution-setting/mutation-types'

export default {
  /**
   * 添加部门
   * @param {*} {}
   * @param {*} data { idSign 可选 , departmentName } { 父级部门的idSign, 部门名称 }
   */
  async addDepartment({}, data) {
    const res = await this.$ajax.post(this.$apis.addDepartment, data)
    return res.ok
  },
  async getChildDepartmentList({}, sign) {
    const res = await this.$ajax.post(this.$apis.getChildDepartmentList, {
      sign,
    })
    return res.ok ? res.data : []
  },
  /**
   * 删除部门
   * @param {*} { dispatch }
   * @param {*} data
   */
  async deleteDepartment({}, data) {
    const res = await this.$ajax.post(this.$apis.deleteDepartment, data)
    return res.ok
  },
  async updateDepartment({}, data) {
    const res = await this.$ajax.post(this.$apis.updateDepartment, data)
    return res.ok
  },
  async getDepartmentTree({ commit }) {
    const res = await this.$ajax.get(this.$apis.getDepartmentTree)
    commit({
      type: types.SET_DEPARTMENT_TREE,
      departmentList: res.data,
    })
  },
}
