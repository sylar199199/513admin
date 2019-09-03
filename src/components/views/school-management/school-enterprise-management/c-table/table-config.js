import Vue from 'vue'
import { CActionBtn, CSwitch } from '@components/base/base-table-related'

export default {
  columns: [
    {
      label: '校企名称',
      prop: 'schoolName',
      fixed: 'left',
    },
    {
      label: '编码/账号',
      prop: 'account',
      width: 150,
    },
    {
      label: '等级',
      prop: 'level',
    },
    {
      label: '类型',
      prop: 'type',
    },
    {
      label: '联系人',
      prop: 'contactName',
    },
    {
      label: '联系手机',
      prop: 'phone',
    },
    {
      label: '关联销售',
      prop: 'salesName',
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
        width: '250',
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
        width: 140,
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
          width: 230,
          fixed: 'right',
          propsHandler({ row }) {
            const config = [
              {
                name: '附件',
                methods: 'auth',
                props: {
                  type: 'default',
                  size: 'mini',
                },
              },
              {
                name: '编辑',
                methods: 'edit',
                props: {
                  type: 'primary',
                  size: 'mini',
                },
              },
              {
                name: '重置',
                methods: 'reset',
                props: {
                  type: 'warning',
                  size: 'mini',
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
