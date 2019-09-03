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
}
const rules = {}

export { formConfigs, formData, rules }
