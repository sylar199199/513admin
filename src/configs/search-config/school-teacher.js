const formData = {
  teacherName: '',
  status: '',
  date: [],
}

const formConfigs = {
  searchPropName: 'teacherCard',
  searchPlaceholder: '请输入教师工号',
  lineStyle: true,
  labelWidth: '100',
  size: 'small',
  formItemList: [
    {
      label: '姓名',
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
          label: '启用',
          value: '1',
        },
        {
          label: '停用',
          value: '2',
        },
      ],
    },
  ],
}

export { formConfigs, formData }
