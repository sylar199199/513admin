// 生产环境使用路由懒加载
const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)
// 默认的路由
export const defaultRouteMaps = [
  {
    path: '/login',
    name: 'login',
    component: _import('login/index'),
  },
]

// 所有的路由，需要进行匹配，后期会开发一个方法来动态输出对应用户权限的路由列表
const previousRoutes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: _import('home/index'),
    meta: { breadText: '首页' },
  },
  {
    name: 'myNotify',
    path: '/educationalProcess/announcements/my-motify',
    component: _import(
      'educational-process/children/announcements/children/my-notify',
    ),
    meta: { breadText: '我的通告' },
  },
]

const rearRoutes = [
  {
    path: '/notFound',
    name: 'notFound',
    component: _import('not-found/index'),
    meta: { breadText: 'notFound' },
  },
  {
    path: '*',
    redirect: '/notFound',
  },
]

// school_management
const schoolManagement = {
  schoolManagement: {
    path: '/schoolManagement',
    name: 'schoolManagement',
    redirect: '/schoolManagement/roleManagement',
    component: _import('school-management/index'),
    meta: { breadText: '教务管理' },
  },
  roleManagement: {
    path: '/schoolManagement/roleManagement',
    name: 'roleManagement',
    component: _import('school-management/children/role-management'),
    meta: { breadText: '角色管理' },
  },
  schoolEnterpriseManagement: {
    path: '/schoolManagement/schoolEnterpriseManagement',
    name: 'schoolEnterpriseManagement',
    component: _import(
      'school-management/children/school-enterprise-management/index',
    ),
    meta: { breadText: '校企管理' },
    children: [
      {
        path:
          '/schoolManagement/schoolEnterpriseManagement/certificatedInformation',
        name: 'certificatedInformation',
        component: _import(
          'school-management/children/school-enterprise-management/children/certificated-information',
        ),
        meta: { breadText: '认证资料' },
      },
    ],
  },
  userManagement: {
    path: '/schoolManagement/userManagement',
    name: 'userManagement',
    component: _import('school-management/children/user-management'),
    meta: { breadText: '用户管理' },
  },
  institutionSetting: {
    path: '/schoolManagement/institutionSetting',
    name: 'institutionSetting',
    component: _import('school-management/children/institution-setting'),
    meta: { breadText: '机构设置' },
  },
  indexManagement: {
    path: '/schoolManagement/indexManagement',
    name: 'indexManagement',
    component: _import('school-management/children/index-management'),
    meta: { breadText: '主页管理' },
  },
  schoolAdministrator: {
    path: '/schoolManagement/schoolAdministrator',
    name: 'schoolAdministrator',
    component: _import('school-management/children/school-administrator'),
    meta: { breadText: '校务员管理' },
  },
}

// 课程详情 很多地方会使用到的页面
const courseDetail = {
  // name: 'courseDetail',
  component: _import('course-detail/index'),
  meta: { breadText: '课程详情' },
}
// source_management

// 新增课程页面
const addCourse = {
  name: 'addCourse',
  component: _import('add-course/index'),
  meta: { breadText: '新增课程' },
}
// 添加合作机构
const cooperativeOrganization = {
  // name: 'cooperativeOrganization',
  component: _import('add-course/cooperativeOrganization'),
  meta: { breadText: '添加合作机构' },
}
const cooperativeOrganizationEdit = {
  // name: 'cooperativeOrganization',
  component: _import('add-course/cooperativeOrganizationEdit'),
  meta: { breadText: '修改合作机构' },
}
// source_management

const sourceManagement = {
  sourceManagement: {
    path: '/sourceManagement',
    name: 'sourceManagement',
    redirect: '/sourceManagement/schoolTeacher',
    component: _import('source-management/index'),
    meta: { breadText: '资源管理' },
  },
  schoolTeacher: {
    path: '/sourceManagement/schoolTeacher',
    name: 'schoolTeacher',
    component: _import('source-management/children/school-teacher'),
    meta: { breadText: '校内教师' },
  },
  schoolStudent: {
    path: '/sourceManagement/schoolStudent',
    name: 'schoolStudent',
    component: _import('source-management/children/school-student'),
    meta: { breadText: '校内学生' },
  },
  courseManagement: {
    path: '/sourceManagement/courseManagement',
    name: 'courseManagement',
    component: _import('source-management/children/course-management'),
    meta: { breadText: '课程管理' },
    children: [
      {
        path: '/sourceManagement/courseManagement/courseDetail/:courseId',
        ...courseDetail,
      },
    ],
  },
  auditCourseList: {
    path: '/sourceManagement/auditCourseList',
    name: 'auditCourseList',
    component: _import('source-management/children/audit-course-list'),
    meta: { breadText: '审核课程管理' },
  },
}

// operationalCooperation
const operationalCooperation = {
  operationalCooperation: {
    path: '/operationalCooperation',
    name: 'operationalCooperation',
    redirect: '/operationalCooperation/introductionCourse',
    component: _import('operational-cooperation/index'),
    meta: { breadText: '运营合作' },
  },
  introductionCourse: {
    path: '/operationalCooperation/introductionCourse',
    name: 'introductionCourse',
    component: _import('operational-cooperation/children/introduction-course'),
    meta: { breadText: '引进供课' },
    children: [
      {
        path:
          '/operationalCooperation/introductionCourse/courseDetail/:courseId',
        ...courseDetail,
      },
      {
        path: '/operationalCooperation/introductionCourse/introductionTeacher',
        component: _import(
          'operational-cooperation/children/children/introduction-teacher',
        ),
        meta: { breadText: '关联教师' },
      },
    ],
  },
  myCourse: {
    path: '/operationalCooperation/myCourse',
    name: 'myCourse',
    component: _import('operational-cooperation/children/my-course'),
    meta: { breadText: '我的供课' },
    children: [
      {
        path: '/operationalCooperation/myCourse/courseDetail/:courseId',
        ...courseDetail,
      },
    ],
  },
  provideCourseList: {
    path: '/operationalCooperation/provideCourseList',
    name: 'provideCourseList',
    component: _import('operational-cooperation/children/provide-course-list'),
    meta: { breadText: '供课管理' },
    children: [
      {
        path:
          '/operationalCooperation/provideCourseList/courseDetail/:courseId',
        ...courseDetail,
      },
      {
        path: '/operationalCooperation/provideCourseManagement/addCourse',
        ...addCourse,
      },
      // 新增合作机构
      {
        path:
          '/operationalCooperation/add-course/cooperativeOrganization/:courseIdSign/:providerSign',
        ...cooperativeOrganization,
      },
      {
        path:
          '/operationalCooperation/add-course/cooperativeOrganizationEdit/:courseIdSign/:providerSign/:sign',
        ...cooperativeOrganizationEdit,
      },
    ],
  },
  createProvideCourse: {
    path: '/operationalCooperation/createProvideCourse',
    name: 'createProvideCourse',
    component: _import('add-course/index'),
    meta: { breadText: '供课列表' },
  },
  orderManagement: {
    path: '/operationalCooperation/order',
    name: 'orderManagement',
    component: _import('operational-cooperation/children/order'),
    meta: { breadText: '订单管理' },
  },
}

const teachingManagement = {
  teachingManagement: {
    path: '/teachingManagement',
    name: 'teachingManagement',
    redirect: '/teachingManagement/studentsRecruitment',
    component: _import('teaching-management/index'),
    meta: { breadText: '教学管理' },
  },
  studentsRecruitment: {
    path: '/teachingManagement/studentsRecruitment',
    name: 'studentsRecruitment',
    component: _import('teaching-management/children/students-recruitment'),
    meta: { breadText: '招生管理' },
  },
  operationAnalysis: {
    path: '/teachingManagement/operationAnalysis',
    name: 'operationAnalysis',
    component: _import('teaching-management/children/operation-analysis'),
    meta: { breadText: '运行分析' },
  },
}

// educationalProcess
const educationalProcess = {
  educationalProcess: {
    path: '/educationalProcess',
    name: 'educationalProcess',
    redirect: '/educationalProcess/announcements',
    component: _import('educational-process/index'),
    meta: { breadText: '教务处理' },
  },
  announcements: {
    path: '/educationalProcess/announcements',
    name: 'announcements',
    component: _import('educational-process/children/announcements/index'),
    meta: { breadText: '通知公告' },
    children: [
      {
        path: '/educationalProcess/announcements/addBulletin',
        name: 'addBulletin',
        component: _import(
          'educational-process/children/announcements/children/bulletin-add',
        ),
        meta: { breadText: '新增通告' },
      },
      {
        path: '/educationalProcess/announcements/editBulletin',
        name: 'editBulletin',
        component: _import(
          'educational-process/children/announcements/children/bulletin-edit',
        ),
        meta: { breadText: '编辑通告' },
      },
    ],
  },
  logManagement: {
    path: '/educationalProcess/logManagement',
    name: 'logManagement',
    component: _import('educational-process/children/log-management'),
    meta: { breadText: '日志管理' },
  },
  schoolNotify: {
    path: '/educationalProcess/schoolNotify',
    name: 'schoolNotify',
    component: _import(
      'educational-process/children/announcements/school-notify',
    ),
    meta: { breadText: '校内公告' },
    children: [
      {
        path: '/educationalProcess/schoolNotify/addBulletin',
        name: 'addSchoolBulletin',
        component: _import(
          'educational-process/children/announcements/children/bulletin-add',
        ),
        meta: { breadText: '新增通告' },
      },
      {
        path: '/educationalProcess/schoolNotify/editBulletin',
        name: 'editSchoolBulletin',
        component: _import(
          'educational-process/children/announcements/children/bulletin-edit',
        ),
        meta: { breadText: '编辑通告' },
      },
    ],
  },
  courseNotify: {
    path: '/educationalProcess/courseNotify',
    name: 'courseNotify',
    component: _import(
      'educational-process/children/announcements/course-notify',
    ),
    meta: { breadText: '课程公告' },
    children: [
      {
        path: '/educationalProcess/courseNotify/addBulletin',
        name: 'addCourselletin',
        component: _import(
          'educational-process/children/announcements/children/bulletin-add',
        ),
        meta: { breadText: '新增通告' },
      },
      {
        path: '/educationalProcess/courseNotify/editBulletin',
        name: 'editCourselletin',
        component: _import(
          'educational-process/children/announcements/children/bulletin-edit',
        ),
        meta: { breadText: '编辑通告' },
      },
    ],
  },
  advertingManagement: {
    path: '/educationalProcess/advertingManagement',
    name: 'advertingManagement',
    component: _import('educational-process/children/adverting-management'),
    meta: { breadText: '广告管理' },
  },
  newsManagement: {
    path: '/educationalProcess/newsManagement',
    name: 'newsManagement',
    component: _import('educational-process/children/news-management'),
    meta: { breadText: '新闻活动' },
    children: [
      {
        path: '/educationalProcess/newsManagement/newsAdd',
        name: 'newsAdd',
        component: _import(
          'educational-process/children/news-children/news-add',
        ),
        meta: { breadText: '新增新闻' },
      },
      {
        path: '/educationalProcess/newsManagement/editNews/:sign',
        name: 'editNews',
        component: _import(
          'educational-process/children/news-children/edit-news',
        ),
      },
    ],
  },
}

const extendRouterMap = {
  ...schoolManagement,
  ...sourceManagement,
  ...operationalCooperation,
  ...teachingManagement,
  ...educationalProcess,
}
// 递归遍历树形menuList 动态生成权限路由
const creatExtensionRoute = menuList => {
  return menuList.map(function(item) {
    if (item.hasOwnProperty('children') && item.children.length) {
      return {
        ...extendRouterMap[item.alias],
        children: creatExtensionRoute(item.children),
      }
    } else {
      return extendRouterMap[item.alias]
    }
  })
}

export const createPermissionRoute = menuInfo => {
  return [...previousRoutes, ...creatExtensionRoute(menuInfo), ...rearRoutes]
}
