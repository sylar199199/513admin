const formData = {
  userName: '',
  bindFlag: '',
  date: [],
  status: '',
}

const formConfigs = {
  searchPropName: 'phone',
  searchPlaceholder: '请输入手机号',
  lineStyle: true,
  labelWidth: '100',
  size: 'small',
  formItemList: [
    {
      label: '昵称',
      type: 'input',
      prop: 'userName',
      placeholder: '请输入用户昵称',
    },
    {
      label: '绑定',
      type: 'select',
      prop: 'bindFlag',
      placeholder: '是否绑定',
      default: '0',
      optList: [
        {
          label: '全部',
          value: '0',
        },
        {
          label: '已绑定',
          value: '1',
        },
        {
          label: '未绑定',
          value: '2',
        },
      ],
    },
    {
      label: '注册时间',
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
