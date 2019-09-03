import Vue from 'vue'
import { CActionBtn, CSwitch } from '@components/base/base-table-related'

export default {
  columns: [
    {
      label: '合作机构',
      prop: 'schoolName',
      width: 150,
      fixed: 'left',
    },
    {
      label: '合作时间自',
      prop: 'startTime',
    },
    {
      label: '合作时间至',
      prop: 'endTime',
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
              {
                name: '删除',
                methods: 'delete',
                props: {
                  size: 'mini',
                  type: 'danger',
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
