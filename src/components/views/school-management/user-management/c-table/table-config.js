import { CActionBtn, CSwitch, CBind } from '@components/base/base-table-related'

export default {
  columns: [
    {
      label: '手机号码',
      prop: 'phone',
    },
    {
      label: '姓名',
      prop: 'userName',
    },
    {
      label: '绑定',
      prop: 'bindFlag',
    },
    {
      label: '注册时间',
      prop: 'createTime',
    },
    {
      label: '来源',
      prop: 'schoolName',
    },
    {
      label: '最后登录',
      prop: 'lastLoginTime',
    },
    {
      label: '状态',
      prop: 'status',
    },
  ],
  columnsSchema: (showBind, statusChange) => {
    return {
      绑定: {
        width: 'auto',
        propsHandler({ row }) {
          const config = {
            methods: 'bind-show',
            isBind: row.bindFlag === '已绑定',
          }
          return { row, config }
        },
        component: CBind,
        listeners: {
          'bind-click': (row, methods) => {
            showBind(row, methods)
          },
        },
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
          propsHandler({ row }) {
            const config = [
              {
                name: '详情',
                methods: 'detail',
                props: {
                  type: 'default',
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
