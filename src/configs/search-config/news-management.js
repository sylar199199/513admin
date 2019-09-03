const formData = {
  category: '0',
  status: '',
}

const formConfigs = types => {
  return {
    searchPropName: 'title',
    searchPlaceholder: '请输入新闻标题',
    lineStyle: true,
    labelWidth: '100',
    size: 'small',
    formItemList: [
      {
        label: '新闻类型',
        type: 'select',
        prop: 'category',
        placeholder: '请选择新闻类型',
        optList: [
          {
            label: '全部',
            value: '0',
          },
          {
            label: '公司动态',
            value: '1',
          },
          {
            label: '行业新闻',
            value: '2',
          },
        ],
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
            label: '禁用',
            value: '2',
          },
        ],
      },
    ],
  }
}
export { formConfigs, formData }
