const formData = {
  type: '',
  date: [],
}

const formConfigs = types => {
  return {
    searchPropName: 'account',
    searchPlaceholder: '请输入操作账号',
    lineStyle: true,
    labelWidth: '100',
    size: 'small',
    formItemList: [
      {
        label: '模块名称',
        type: 'select',
        prop: 'type',
        placeholder: '请选择模块名称',
        optList: [
          {
            label: '全部',
            value: '0',
          },
          ...types,
        ],
      },
      {
        label: '创建时间',
        type: 'range-datepicker',
        prop: 'date',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    ],
  }
}
export { formConfigs, formData }
