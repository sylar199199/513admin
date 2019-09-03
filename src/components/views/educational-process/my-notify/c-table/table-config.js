import Vue from 'vue'
import { CActionBtn } from '@components/base/base-table-related'
export default {
  columns: [
    {
      label: '标题',
      prop: 'title',
      width: 150,
      fixed: 'left',
    },
    {
      label: '通知类型',
      prop: 'msgType',
    },
    {
      label: '发布者',
      prop: 'createName',
    },
    {
      label: '时间',
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
          width: 200,
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
                      type: 'primary',
                      size: 'mini',
                    },
                    on: {
                      click: () => {
                        this.$emit('action-click', this.row, 'detail')
                      },
                    },
                  },
                  '详情',
                ),
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
                  '删除',
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
