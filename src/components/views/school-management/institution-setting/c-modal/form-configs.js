import { checkName } from '@utils/base-validators'

const formData = {
  parentDepartmentName: '',
  departmentName: '',
}

const formConfigs = (isDisabled, type) => {
  return {
    lineStyle: false,
    labelWidth: '80px',
    labelPosition: 'right',
    formItemList: [
      {
        type: 'input',
        disabled: isDisabled,
        prop: 'parentDepartmentName',
        label: type === 'add' ? '上级部门' : '部门名称',
      },
      {
        type: 'input',
        prop: 'departmentName',
        label: '部门名称',
        placeholder: '请输入部门名称',
      },
    ],
  }
}
const rules = {
  departmentName: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    {
      validator: checkName,
      trigger: 'blur',
    },
  ],
}

export { formConfigs, formData, rules }
