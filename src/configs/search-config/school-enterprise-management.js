const formData = {
  type: '',
  status: '',
  date: [],
}

const formConfigs = {
  searchPropName: 'schoolName',
  searchPlaceholder: '请输入学校名称',
  lineStyle: true,
  labelWidth: '100',
  size: 'small',
  formItemList: [
    {
      label: '类型',
      type: 'select',
      prop: 'type',
      placeholder: '请选择类型',
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
          label: '院校',
          value: '1',
        },
        {
          label: '机构',
          value: '2',
        },
        {
          label: '企业',
          value: '3',
        },
      ],
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
