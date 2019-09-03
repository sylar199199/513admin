import Vue from 'vue'
import { CActionBtn, CSwitch } from '@components/base/base-table-related'

export default {
  columns: [
    {
      label: '姓名',
      prop: 'studentName',
      width: 150,
      fixed: 'left',
    },
    {
      label: '学号',
      prop: 'studentCard',
    },
    {
      label: '学院',
      prop: 'college_name',
    },
    {
      label: '专业（系）',
      prop: 'professional_name',
    },
    {
      label: '入学年份',
      prop: 'entranceTime',
    },
    {
      label: '班级',
      prop: 'class_name',
    },
    {
      label: '学历',
      prop: 'educationLevel',
      width: 150,
    },
    {
      label: '联系手机',
      prop: 'phone',
      width: 150,
    },
    {
      label: '创建人/时间',
      prop: 'createTime',
      width: 150,
    },
    {
      label: '状态',
      prop: 'status',
    },
  ],
  columnsSchema: statusChange => {
    return {
      '创建人/时间': {
        width: 200,
        propsHandler({ col, row }) {
          return { value: `${row.createName}/${row[col.prop]}` }
        },
        component: Vue.extend({
          props: {
            value: {
              type: String,
              default: '',
            },
          },
          render(h) {
            return h('span', {}, this.value)
          },
        }),
      },
      状态: {
        width: 100,
        propsHandler({ row }) {
          const config = {
            activeText: '启用',
            inactiveText: '禁用',
            initValue: row.status === '启用',
            confirmActiveText: '启用',
            confirmInactiveText: '禁用',
          }
          return { row, config }
        },
        component: CSwitch,
        listeners: {
          'switch-change': ({ row, cb }) => {
            statusChange(row, cb)
          },
        },
      },
    }
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
          propsHandler({ row }) {
            const config = [
              {
                name: '编辑',
                methods: 'edit',
                props: {
                  size: 'mini',
                  type: 'primary',
                },
              },
            ]
            return { row, config }
          },
          component: CActionBtn,
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
