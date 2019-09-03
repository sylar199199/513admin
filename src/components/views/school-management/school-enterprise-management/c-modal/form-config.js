import {
  checkPhone,
  checkEmail,
  checkName,
  checkCompanyName,
} from '@utils/base-validators'

const formData = {
  schoolName: '',
  manageName: '',
  typeIdSign: '',
  phone: '',
  schoolCode: '',
  address: '',
  schoolLevel: '',
  email: '',
  intro: '',
  description: '',
  date: [],
  salesIdSign: '',
}
const itemWidthStyle = {
  width: 'calc(50% - 15px)',
}
const inputWidthStyle = {
  width: '350px',
}
const formConfigs = salesList => {
  return {
    size: 'small',
    lineStyle: true,
    labelWidth: '80px',
    labelPosition: 'right',
    formItemList: [
      {
        itemStyle: itemWidthStyle,
        style: inputWidthStyle,
        type: 'input',
        prop: 'schoolName',
        label: '企业名称',
        placeholder: '请输入企业名称',
      },
      {
        itemStyle: itemWidthStyle,
        style: inputWidthStyle,
        type: 'input',
        prop: 'manageName',
        label: '联系人',
        placeholder: '请输入联系人',
      },
      {
        itemStyle: itemWidthStyle,
        style: inputWidthStyle,
        type: 'select',
        prop: 'typeIdSign',
        label: '企业类型',
        placeholder: '请选择企业类型',
        optList: [
          {
            label: '院校',
            value: '1',
          },
          {
            label: '机构',
            value: '3',
            disabled: true,
          },
          {
            label: '企业',
            value: '2',
            disabled: true,
          },
        ],
      },
      {
        itemStyle: itemWidthStyle,
        style: inputWidthStyle,
        type: 'input',
        prop: 'phone',
        label: '联系手机',
        placeholder: '请输入手机号',
      },
      {
        style: inputWidthStyle,
        itemStyle: itemWidthStyle,
        type: 'input',
        prop: 'schoolCode',
        label: '企业代号',
        placeholder: '请输入院校代码或企业注册码',
      },
      {
        style: inputWidthStyle,
        itemStyle: itemWidthStyle,
        type: 'input',
        prop: 'address',
        label: '联系地址',
        placeholder: '请输入联系地址',
      },
      {
        style: inputWidthStyle,
        itemStyle: itemWidthStyle,
        type: 'select',
        prop: 'schoolLevel',
        label: '企业等级',
        placeholder: '请输入企业等级',
        optList: [
          {
            label: '普通',
            value: '1',
          },
          {
            label: '会员',
            value: '2',
          },
        ],
      },
      {
        style: inputWidthStyle,
        itemStyle: itemWidthStyle,
        type: 'input',
        prop: 'email',
        label: '电子邮箱',
        placeholder: '请输入电子邮箱',
      },
      {
        style: inputWidthStyle,
        itemStyle: itemWidthStyle,
        type: 'select',
        prop: 'salesIdSign',
        label: '关联销售',
        placeholder: '请选择关联销售',
        labelKey: 'name',
        valueKey: 'sign',
        optList: salesList,
      },
      {
        style: inputWidthStyle,
        itemStyle: itemWidthStyle,
        type: 'daterange',
        prop: 'date',
        label: '合同期限',
        pickerOpt: {
          disabledDate: time => {
            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
          },
        },
      },
      {
        style: inputWidthStyle,
        itemStyle: itemWidthStyle,
        type: 'textarea',
        label: '企业简介',
        prop: 'intro',
      },
      {
        style: inputWidthStyle,
        itemStyle: itemWidthStyle,
        type: 'textarea',
        label: '备    注',
        prop: 'description',
      },
    ],
  }
}
const rules = {
  schoolName: [
    { required: true, message: '请输入校企名称', trigger: 'blur' },
    {
      validator: checkName,
      trigger: 'blur',
    },
  ],
  schoolCode: [{ required: true, message: '请输入企业代号', trigger: 'blur' }],
  manageName: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
    {
      validator: checkName,
      trigger: 'blur',
    },
  ],
  typeIdSign: [{ required: true, message: '请输入企业类型', trigger: 'blur' }],
  daterange: [{ required: true, message: '请选择选择高校', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入联系手机号', trigger: 'blur' },
    { validator: checkPhone, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  schoolLevel: [{ required: true, message: '请输入企业等级', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入企业邮箱', trigger: 'blur' },
    { validator: checkEmail, message: '请输入正确的企业邮箱', trigger: 'blur' },
  ],
  date: [{ required: true, message: '请选择日期', trigger: 'blur' }],
}

export { formConfigs, formData, rules }
