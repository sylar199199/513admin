import { checkName, checkUserNumber } from '@utils/base-validators'

const formData = {
  studentName: '',
  studentCard: '',
}

const formConfigs = {
  size: 'small',
  lineStyle: false,
  labelWidth: '80px',
  labelPosition: 'right',
  formItemList: [
    {
      type: 'input',
      prop: 'studentName',
      label: '学生名称',
      placeholder: '请输入学生名称',
    },
    {
      type: 'input',
      prop: 'studentCard',
      label: '学号',
      placeholder: '请输入学生学号',
    },
  ],
}
const rules = {
  studentName: [
    { required: true, message: '请输入学生姓名', trigger: 'blur' },
    { validator: checkName, trigger: 'blur' },
  ],
  studentCard: [
    { required: true, message: '请输入学生学号', trigger: 'blur' },
    { validator: checkUserNumber, trigger: 'blur' },
  ],
}

export { formConfigs, formData, rules }
