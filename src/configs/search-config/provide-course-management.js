const formData = {
  teacherName: '',
  status: '',
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
      label: '状态',
      type: 'select',
      prop: 'status',
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
          label: '已发布',
          value: '1',
        },
        {
          label: '未发布',
          value: '2',
        },
      ],
    },
  ],
}

export { formConfigs, formData }
