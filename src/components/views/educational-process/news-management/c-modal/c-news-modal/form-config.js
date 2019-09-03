import { checkName, checkUserNumber } from '@utils/base-validators'
const radioStyle = {
  width: 'calc(50% - 15px)',
}
const formData = {
  type: '',
  content: '',
  title: '',
  typeChange: '',
  date: [],
  sort: '',
  courseId: '',
}
const itemWidthStyle = {
  width: 'calc(50% - 15px)',
}
const inputWidthStyle = {
  width: '350px',
}
const radioWidthStyle = {
  marginLeft: '556px',
}
const radioWidthStyle1 = {
  clear: 'right',
}
const formConfigs = {
  size: 'small',
  lineStyle: true,
  labelWidth: '80px',
  labelPosition: 'right',
  formItemList: [
    {
      itemStyle: itemWidthStyle,
      style: inputWidthStyle,
      type: 'select',
      prop: 'content',
      label: '广告位置',
      placeholder: '请选择广告位置',
      optList: [
        {
          label: 'PC端首页顶部banner位',
          value: 'PC端首页顶部banner位',
        },
        {
          label: 'APP端首页顶部banner位',
          value: 'APP端首页顶部banner位',
        },
      ],
    },
    {
      itemStyle: itemWidthStyle,
      style: inputWidthStyle,
      type: 'daterange',
      prop: 'date',
      label: '生效时间',
    },
    {
      itemStyle: itemWidthStyle,
      style: inputWidthStyle,
      type: 'input',
      prop: 'title',
      label: '广告标题',
      placeholder: ' 请输入广告标题',
    },
    {
      itemStyle: itemWidthStyle,
      style: inputWidthStyle,
      type: 'select',
      prop: 'type',
      label: '图片类型',
      placeholder: '请选择图片类型',
      optList: [
        {
          label: 'PC',
          value: '1',
        },
        {
          label: 'APP',
          value: '2',
        },
        {
          label: 'PC和APP',
          value: '3',
        },
      ],
    },
    {
      itemStyle: itemWidthStyle,
      style: inputWidthStyle,
      type: 'input',
      prop: 'sort',
      label: '排列顺序',
      placeholder: '填写数字（为空则自增长）',
    },
    {
      label: '广告跳转',
      width: '170px',
      type: 'radio',
      prop: 'typeChange',
      key: ' 链接',
    },
    {
      width: '500',
      type: 'input',
      prop: 'url',
      placeholder: '请输入链接地址',
    },
    {
      style: radioWidthStyle,
      width: '170px',
      type: 'radio',
      prop: 'typeChange',
      key: '课程',
    },
    {
      width: '350px',
      type: 'input',
      prop: 'courseIdSign',
      placeholder: '请选择关联课程',
    },
  ],
}
const rules = {
  content: [{ required: true, message: '请选择广告位置', trigger: 'blur' }],
  title: [{ required: true, message: '请选择广告标题', trigger: 'blur' }],
  typeChange: [{ required: true, message: '请选择跳转方式', trigger: 'blur' }],
  type: [{ required: true, message: '请选择图片类型', trigger: 'blur' }],
}

export { formConfigs, formData, rules }
