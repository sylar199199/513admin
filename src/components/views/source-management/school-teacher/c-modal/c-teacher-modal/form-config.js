import {
  checkName,
  checkUserNumber,
  checkDescribe,
} from '@utils/base-validators'

const formData = {
  teacherName: '',
  teacherCard: '',
  departmentName: [],
  teacherTitle: '',
  introduction: '',
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
        prop: 'teacherName',
        label: '教师名称',
        placeholder: '请输入教师名称',
      },
      {
        type: 'input',
        prop: 'teacherCard',
        label: '教师工号',
        placeholder: '请输入教师工号',
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
        type: 'input',
        prop: 'teacherTitle',
        label: '教师职称',
        placeholder: '请输入教师职称',
      },
      {
        type: 'textarea',
        prop: 'introduction',
        label: '教师简介',
      },
    ],
  }
}
const rules = {
  teacherName: [
    { required: true, message: '请输入教师姓名', trigger: 'blur' },
    { validator: checkName, trigger: 'blur' },
  ],
  teacherCard: [
    { required: true, message: '请输入教师工号', trigger: 'blur' },
    { validator: checkUserNumber, trigger: 'blur' },
  ],
  departmentName: [
    { required: true, message: '请选择所属部门', trigger: 'blur' },
  ],
  teacherTitle: [
    { required: true, message: '请选择教师职称', trigger: 'blur' },
    { validator: checkDescribe, trigger: 'blur' },
  ],
}

export { formConfigs, formData, rules }
