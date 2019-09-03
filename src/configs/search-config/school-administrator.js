const formData = {
  phone: '',
  account: '',
  name: '',
  status: '',
  date: [],
}

const formConfigs = {
  searchPropName: 'account',
  searchPlaceholder: '请输入账号进行查找',
  lineStyle: true,
  labelWidth: '100',
  size: 'small',
  formItemList: [
    {
      label: '姓名',
      type: 'input',
      prop: 'name',
      placeholder: '请输入姓名',
    },
    {
      label: '联系手机',
      type: 'input',
      prop: 'phone',
      placeholder: '请输入联系手机',
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
