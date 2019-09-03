export default {
  // 资源管理：校内学生
  getAllAddCourseList: '/courseInfo/getIntroduceCourseList', // 获取学校所有学生
  getAllAddCourseListSelect: '/school/getDownSchoolList', // 获取供方校企名称下拉选列表
  getStudentById: '/introduce/getByIntroduceId', // 获取供方校企名称下拉选列表
  getAddCourseDetailById: '/introduce/getByIntroduceId', //根据签名获取相关课程详情
  addCoueseIntroduce: '/introduce/addIntroduce', //添加合作机构
  updateCoueseIntroduce: '/introduce/UpdateIntroduceList', //修改合作机构
  updateReleaseStatus: '/introduce/UpdateReleaseStatus', //引进课程上下架
  deleteIntroduce: '/introduce/deleteIntroduce', // 删除合作机构
  updateIntroduceListDeleteFlag: '/introduce/updateIntroduceListDeleteFlag', // 删除合作机构
  getAddCourseDetailFormlist: '/introduce/getIntroduceId', // 获取合作机构详情
}
