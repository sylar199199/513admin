import Vue from 'vue'

export default {
  columns: [
    {
      label: '姓名',
      prop: 'userName',
    },
    {
      label: '教师工号',
      prop: 'teacherCard',
      fixed: 'left',
    },
    {
      label: '职称',
      prop: 'teacherTitle',
    },
    {
      label: '部门',
      prop: 'departmentName',
    },
    {
      label: '联系手机',
      prop: 'phone',
    },
    {
      label: '创建人',
      prop: 'createName',
    },
    {
      label: '创建时间',
      prop: 'createTime',
    },
  ],
  columnsSchema: () => {
    return {}
  },
  // 操作cols
  actions: () => {
    return {
      columnsHandler(cols) {
        return cols.concat({
          label: '操作',
          align: 'center',
          width: 150,
          fixed: 'right',
          component: Vue.extend({
            props: {
              row: {
                type: Object,
                default: () => {},
              },
            },
            render(h) {
              return h('div', null, [
                h(
                  'el-button',
                  {
                    props: {
                      type: 'danger',
                      size: 'mini',
                    },
                    on: {
                      click: () => {
                        this.$emit('action-click', this.row, 'delete')
                      },
                    },
                  },
                  '移除',
                ),
              ])
            },
          }),
          listeners: {
            'action-click': (row, methods) => {
              this.handleAction(row, methods)
            },
          },
        })
      },
    }
  },
}
