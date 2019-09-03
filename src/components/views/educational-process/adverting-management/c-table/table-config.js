import { CActionBtn, CSwitch } from '@components/base/base-table-related'
import Vue from 'vue'

export default {
  columns: [
    {
      label: '广告位置',
      prop: 'content',
      fixed: 'left',
    },
    {
      label: '广告标题',
      prop: 'title',
    },
    {
      label: '生效时间',
      prop: 'expiryTime',
    },
    {
      label: '排序',
      prop: 'sort',
    },
    {
      label: '创建时间',
      prop: 'createTime',
    },
    {
      label: '状态',
      prop: 'status',
    },
  ],
  columnsSchema: statusChange => {
    return {
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
          fixed: 'right',
          width: 230,
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
                name: '编辑',
                methods: 'edit',
                props: {
                  type: 'primary',
                  size: 'mini',
                },
              },
              {
                name: '删除',
                methods: 'delete',
                props: {
                  type: 'danger',
                  size: 'mini',
                },
              },
            ]
            return { row, config }
          },
          component: CActionBtn,
          listeners: {
            'action-click': (row, methods) => {
              this.handleAction(methods, row)
            },
          },
        })
      },
    }
  },
}
