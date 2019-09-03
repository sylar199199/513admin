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

const formConfigs = (departmentOpts = [], roleOpts = []) => {
  return {
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
        type: 'cascader',
        prop: 'departmentName',
        label: '所属部门',
        placeholder: '请选择所属部门',
        optList: departmentOpts,
        propsSetting: {
          value: 'label',
          checkStrictly: true,
        },
      },
      {
        type: 'select',
        prop: 'roleName',
        label: '所属角色',
        placeholder: '请选择角色',
        optList: roleOpts,
        valueKey: 'name',
        labelKey: 'name',
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
}
//TODO: name: 小写英文 以及 :
const rules = {
  name: [
    { required: true, message: '请输入用户姓名', trigger: 'blur' },
    { validator: checkName, trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入联系手机号', trigger: 'blur' },
    { validator: checkPhone, trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
    { validator: checkEmail, trigger: 'blur' },
  ],
  departmentName: [{ required: true, message: '请选择部门', trigger: 'blur' }],
  roleName: [{ required: true, message: '请选择角色信息', trigger: 'blur' }],
}

export { formConfigs, formData, rules }
