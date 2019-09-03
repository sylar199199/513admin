export default {
  // 校务管理：校企管理
  getSchoolList: '/school/getAllSchoolList', // 获取所有校企列表
  updateSchoolStatus: '/school/updateSchoolStatus', // 更新学校状态
  resetSchoolPassword: '/school/passwordReset', // 重置校企密码
  addSchool: '/school/saveSchool', // 添加校企
  getSchoolById: '/school/getBySchoolId', // 获取某一校企数据
  updateSchool: '/school/updateSchool', // 更新校企
  getAuthDataById: '/authData/getByAuthDataId', // 根据id获取学校资料信息
  updateAuthData: '/authData/updateAuthData', // 更新认证资料
  addAuthData: '/authData/addAuthData', // 新增认证资料
}
