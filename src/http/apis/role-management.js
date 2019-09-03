export default {
  // 校务管理：角色管理
  getRoleList: '/role/allRoleCountList', // 获取当前学校所有角色
  updateRole: '/role/updateRole', // 更改角色信息
  addRole: '/role/addRole', // 新增角色
  getRoleTreeView: 'role/roleTreeView', // 角色权限详情
  setRolePermission: '/role/setRole', // 设置role权限
  deleteRole: '/role/delRole', // 删除角色
  gitRoleAccountList: '/role/getManagerRoleList', // 获取role关联的账
  getByUsersId: '/user/getByUsersId', // 根据用户id获取用户详情
}
