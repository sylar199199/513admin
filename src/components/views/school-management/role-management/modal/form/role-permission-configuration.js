const formData = {
  name: '',
  description: '',
}

const formConfigs = disabled => {
  return {
    lineStyle: false,
    labelWidth: '80px',
    labelPosition: 'right',
    formItemList: [
      {
        type: 'input',
        prop: 'name',
        disabled: disabled,
        label: '角色名称',
        placeholder: '请输入角色名称',
      },
      {
        type: 'textarea',
        label: '角色描述',
        prop: 'description',
      },
    ],
  }
}
//TODO: name: 小写英文 以及 :
const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入角色信息', trigger: 'blur' }],
}

export { formConfigs, formData, rules }
