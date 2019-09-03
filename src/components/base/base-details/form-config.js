import { checkPhone, checkName } from '@utils/base-validators'
import { checkEmail } from '../../../utils/base-validators'

const formData = {
  name: '',
  schoolName: '',
  phone: '',
  email: '',
  address: '',
}

const formConfigs = (departmentOpts = []) => {
  return {
    size: 'small',
    lineStyle: false,
    labelWidth: '80px',
    labelPosition: 'right',
    formItemList: [
      {
        type: 'input',
        prop: 'name',
        label: '姓名',
        placeholder: '请输入教师名称',
      },
      {
        type: 'input',
        prop: 'schoolName',
        label: '学校',
        disabled: 'disabled',
      },
      {
        type: 'input',
        prop: 'phone',
        label: '手机',
        placeholder: '请输入手机号',
      },
      {
        type: 'input',
        prop: 'email',
        label: '邮箱',
        placeholder: '请输入邮箱',
      },
      {
        type: 'input',
        prop: 'address',
        label: '地址',
        placeholder: '请输入教师工号',
      },
    ],
  }
}
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { validator: checkName, trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入正确手机号', trigger: 'blur' },
    { validator: checkPhone, trigger: 'blur' },
  ],
  email: [{ validator: checkEmail, trigger: 'blur' }],
}

export { formConfigs, formData, rules }
