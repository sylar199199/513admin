const secondGradHasChildrenRouterMaps = {
  // 2级包含子路由的模块
  schoolManagement: [
    {
      name: '教务管理',
    },
  ],
  sourceManagement: [
    {
      name: '资源管理',
    },
  ],
  courseManagement: [
    {
      name: '课程管理',
      link: '/sourceManagement/courseManagement',
    },
  ],
  operationalCooperation: [
    {
      name: '运营合作',
    },
  ],
  teachingManagement: [
    {
      name: '教学管理',
    },
  ],
  educationalProcess: [
    {
      name: '教务处理',
    },
  ],
  introductionCourse: [
    {
      name: '引进课程',
      link: '/operationalCooperation/introductionCourse',
    },
  ],
  myCourse: [
    {
      name: '我的供课',
      link: '/operationalCooperation/myCourse',
    },
  ],
  provideCourseList: [
    {
      name: '供课管理',
      link: '/operationalCooperation/provideCourseList',
    },
  ],
  orderManagement: [
    {
      name: '订单管理',
      link: '/operationalCooperation/order',
    },
  ],
  announcements: [
    {
      name: '通知公告',
      link: '/educationalProcess/announcements',
    },
  ],
  courseNotify: [
    {
      name: '课程通知',
      link: '/educationalProcess/courseNotify',
    },
  ],
  schoolNotify: [
    {
      name: '校内通知',
      link: '/educationalProcess/schoolNotify',
    },
  ],
  schoolEnterpriseManagement: [
    {
      name: '校企管理',
      link: '/schoolManagement/schoolEnterpriseManagement',
    },
  ],
  advertingManagement: [
    {
      name: '广告管理',
      link: '/operationalCooperation/provideCourseManagement',
    },
  ],
  newsManagement: [
    {
      name: '新闻活动',
      link: '/educationalProcess/newsManagement',
    },
  ],
  newsAdd: [
    {
      name: '新增新闻',
      link: 'newsManagement/newsAdd',
    },
  ],
  editNews: [
    {
      name: '编辑新闻',
      link: 'editNews',
    },
  ],
}
export default {
  ...secondGradHasChildrenRouterMaps,
}
