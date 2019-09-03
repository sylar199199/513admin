import { checkName, checkDescribe } from '@utils/base-validators'
const formData = {
  name: '',
  description: '',
}

const formConfigs = () => {
  return {
    lineStyle: false,
    labelWidth: '80px',
    labelPosition: 'right',
    formItemList: [
      {
        type: 'input',
        prop: 'name',
        label: '角色名称',
        placeholder: '请输入角色名称',
      },
      {
        type: 'textarea',
        label: '角色描述',
        prop: 'description',
        maxlength: '200',
      },
    ],
  }
}
//TODO: name: 小写英文 以及 :
const rules = {
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { validator: checkName, trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请输入角色描述', trigger: 'blur' },
    { validator: checkDescribe, trigger: 'blur' },
  ],
}

export { formConfigs, formData, rules }
