import { checkName, checkUserNumber } from '@utils/base-validators'
const formData = {
  type: '',
  content: '',
  title: '',
  typeChange: '',
  date: [],
  sort: '',
  courseId: '',
}
// iuput 宽度
const elementWidth = {
  width: '350px',
}

const radioStyle = {
  width: '80px',
}
const selectStyle = {
  width: '260px',
}
const inputStyle = {
  width: '260px',
  position: 'absolute',
  top: '-51px',
  left: '90px',
}
const checkStyle = {
  position: 'absolute',
  top: '239px',
  left: '110px',
}
const timeStyle = {
  position: 'relative',
  top: '10px',
}
const radioWidthStyle = {
  position: 'absolute',
  width: '100px',
}
const CourseStyle = {
  position: 'absolute',
  top: '240px',
  zIndex: 100,
}
const formConfigs = types => {
  return {
    size: 'small',
    lineStyle: false,
    labelWidth: '80px',
    labelPosition: 'right',
    formItemList: [
      {
        style: elementWidth,
        type: 'input',
        prop: 'title',
        label: '广告标题',
        placeholder: ' 请输入广告标题',
      },
      {
        style: elementWidth,
        type: 'select',
        prop: 'content',
        label: '广告位置',
        placeholder: '请选择广告位置',
        optList: [
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
        label: '广告跳转',
        style: radioStyle,
        type: 'radio',
        prop: 'typeChange',
        key: ' 链接',
      },
      {
        itemStyle: radioStyle,
        style: inputStyle,
        type: 'input',
        prop: 'url',
        placeholder: '请输入链接地址',
      },
      {
        itemStyle: CourseStyle,
        style: radioStyle,
        type: 'radio',
        prop: 'typeChange',
        key: '课程',
      },
      {
        itemStyle: checkStyle,
        style: selectStyle,
        type: 'select',
        prop: 'courseIdSign',
        placeholder: '请选择课程',
        optList: types,
      },
      {
        itemStyle: timeStyle,
        style: elementWidth,
        type: 'daterange',
        prop: 'date',
        label: '生效时间',
      },
      {
        style: elementWidth,
        type: 'input',
        prop: 'sort',
        label: '排列顺序',
        placeholder: '填写数字（为空则自增长）',
      },
    ],
  }
}
const rules = {
  content: [{ required: true, message: '请选择广告位置', trigger: 'blur' }],
  title: [{ required: true, message: '请选择广告标题', trigger: 'blur' }],
  typeChange: [{ required: true, message: '请选择跳转方式', trigger: 'blur' }],
  type: [{ required: true, message: '请选择图片类型', trigger: 'blur' }],
}

export { formConfigs, formData, rules }
