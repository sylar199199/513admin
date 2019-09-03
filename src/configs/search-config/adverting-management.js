const formData = {
  content: '',
  status: '',
}

const formConfigs = types => {
  return {
    searchPropName: 'title',
    searchPlaceholder: '请输入广告标题',
    lineStyle: true,
    labelWidth: '100',
    size: 'small',
    formItemList: [
      {
        label: '广告位置',
        type: 'select',
        prop: 'content',
        placeholder: '请选择广告位置',
        optList: [
          {
            label: '全部',
            value: '0',
          },
          {
            label: 'PC端首页顶部banner位',
            value: '1',
          },
          {
            label: 'APP端首页顶部banner位',
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
}
export { formConfigs, formData }
