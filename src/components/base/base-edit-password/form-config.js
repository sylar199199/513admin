import { checkPassword } from '../../../utils/base-validators'

const formData = {
  oldPwd: '',
  newPwd: '',
  confirmPwd: '',
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
        prop: 'oldPwd',
        label: '原密码',
        isPassword: true,
        placeholder: '请输入原密码',
      },
      {
        type: 'input',
        prop: 'newPwd',
        label: '新密码',
        isPassword: true,
        placeholder: '请输入新密码',
      },
      {
        type: 'input',
        prop: 'confirmPwd',
        label: '确认密码',
        isPassword: true,
        placeholder: '请再次输入密码',
      },
    ],
  }
}
const rules = {
  oldPwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { validator: checkPassword, trigger: 'blur' },
  ],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: checkPassword, trigger: 'blur' },
  ],
  confirmPwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { validator: checkPassword, trigger: 'blur' },
  ],
}

export { formConfigs, formData, rules }
