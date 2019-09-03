const formData = {
  teacherName: '',
  auditStatus: '',
  date: [],
}

const formConfigs = {
  searchPropName: 'courseName',
  searchPlaceholder: '请输入课程名称',
  lineStyle: true,
  labelWidth: '100',
  size: 'small',
  formItemList: [
    {
      label: '教师姓名',
      type: 'input',
      prop: 'teacherName',
      placeholder: '请输入教师姓名',
    },
    {
      label: '创建时间',
      type: 'range-datepicker',
      prop: 'date',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
    },
    {
      label: '审核状态',
      type: 'select',
      prop: 'auditStatus',
      placeholder: '请选择状态',
      style: {
        width: '150px',
      },
      default: '0',
      optList: [
        {
          label: '全部',
          value: '0',
        },
        {
          label: '待审核',
          value: '1',
        },
        {
          label: '审核通过',
          value: '2',
        },
        {
          label: '已拒绝',
          value: '3',
        },
      ],
    },
  ],
}

export { formConfigs, formData }
