export default {
  // 校务管理：校务员管理
  getAllManagerList: '/manager/getAllManagerList', // 获取所有校务员
  resetManagerPassword: '/manager/passwordReset', // 重置校务员密码
  updateManagerStatus: '/manager/updateManagerStatus', // 更新校务员状态
  addSchoolAdministrator: '/manager/addManager', // 添加校务员
  updateSchoolAdministrator: '/manager/updateManager', // 更新校务员
  getSchoolAdministratorById: '/manager/getByManagerId', // 获取某一个校务员
  getSchoolAllAdministrator: '/manager/searchUserComboBox', // 获取学校所有的管理员
}
