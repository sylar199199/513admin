const formData = {
  schoolName: '',
  status: '',
  typeIdSign: '',
  date: [],
}
const itemWidthStyle = {
  width: 'calc(50% - 15px)',
}
const inputWidthStyle = {
  width: '350px',
}
const formConfigs = types => {
  return {
    size: 'small',
    lineStyle: true,
    labelWidth: '120px',
    labelPosition: 'right',
    formItemList: [
      {
        label: '合作结构:',
        type: 'select',
        prop: 'schoolName',
        placeholder: '请选择合作结构',
        style: inputWidthStyle,
        optList: [...types],
      },
      {
        style: inputWidthStyle,
        itemStyle: itemWidthStyle,
        label: '合作时间',
        type: 'range-datepicker',
        prop: 'date',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
      },
    ],
  }
}
//TODO: name: 小写英文 以及 :
const rules = {
  schoolName: [
    { required: true, message: '请输入合作机构名称', trigger: 'blur' },
  ],
  date: [{ required: true, message: '请选择合作时间', trigger: 'blur' }],
}

export { formConfigs, formData, rules }
