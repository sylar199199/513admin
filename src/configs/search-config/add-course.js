const formData = {
  courseName: '',
  status: '0',
  date: [],
}
const formConfigs = types => {
  return {
    searchPropName: 'courseName',
    searchPlaceholder: '请输入课程名称',
    lineStyle: true,
    labelWidth: '100',
    size: 'small',
    formItemList: [
      {
        label: '供方校企名称:',
        type: 'select',
        prop: 'teacherName',
        placeholder: '请选择供方校企名称',
        optList: [...types],
      },
    ],
  }
}
export { formConfigs, formData }
