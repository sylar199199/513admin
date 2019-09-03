import { checkPhone, checkEmail, checkName } from '@utils/base-validators'

const formData = {
  name: '',
  phone: '',
  departmentName: [],
  roleName: '',
  address: '',
  email: '',
  remark: '',
  idSign: '',
}

const formConfigs = {
  size: 'small',
  lineStyle: false,
  labelWidth: '80px',
  labelPosition: 'right',
  formItemList: [
    {
      type: 'input',
      prop: 'name',
      label: '用户姓名',
      placeholder: '请输入用户名称',
    },
    {
      type: 'input',
      prop: 'phone',
      label: '联系手机',
      placeholder: '请输入联系手机号',
    },
    {
      type: 'input',
      prop: 'address',
      label: '联系地址',
      placeholder: '请输入联系地址',
    },
    {
      type: 'input',
      prop: 'email',
      label: '电子邮箱',
      placeholder: '请输入电子邮箱',
    },
    {
      type: 'textarea',
      prop: 'remark',
      label: '备    注',
    },
  ],
}

export { formConfigs, formData }
