import Vue from 'vue'
import { CActionBtn, CSwitch } from '@components/base/base-table-related'

export default {
  columns: [
    {
      label: '通知类型',
      prop: 'msgType',
      fixed: 'left',
      width: 150,
    },
    {
      label: '标题',
      prop: 'title',
    },
    {
      label: '推送目标',
      prop: 'notifyType',
      width: 80,
    },
    {
      label: '状态',
      prop: 'status',
    },
    {
      label: '创建人',
      prop: 'createName',
      width: 120,
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: 200,
    },
  ],
  // 操作cols
  actions: () => {
    return {
      columnsHandler(cols) {
        return cols.concat({
          label: '操作',
          align: 'center',
          width: 180,
          fixed: 'right',
          propsHandler({ row }) {
            const config = [
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
  columnsSchema: statusChange => {
    return {
      通知类型: {
        width: '200',
        propsHandler({ row }) {
          let type = null
          switch (row.msgType) {
            case '1':
              type = '校内通知'
              break
            case '2':
              type = '课程通知'
              break
            case '3':
              type = '系统公告'
              break
            default:
              break
          }
          return { type }
        },
        component: Vue.extend({
          props: {
            type: {
              type: String,
              default: '',
            },
          },
          render(h) {
            return h('span', {}, this.type)
          },
        }),
      },
      推送目标: {
        width: '200',
        propsHandler({ row }) {
          let type = null
          switch (row.notifyType) {
            case '1':
              type = '全体人员'
              break
            case '2':
              type = '部分校企'
              break
            case '3':
              type = '全校人员'
              break
            case '4':
              type = '全体教职工'
              break
            default:
              break
          }
          return { type }
        },
        component: Vue.extend({
          props: {
            type: {
              type: String,
              default: '',
            },
          },
          render(h) {
            return h('span', {}, this.type)
          },
        }),
      },
      状态: {
        width: 120,
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
}
