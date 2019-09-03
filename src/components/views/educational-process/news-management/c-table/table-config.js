import { CActionBtn, CSwitch } from '@components/base/base-table-related'
import Vue from 'vue'

export default {
  columns: [
    {
      label: '新闻标题',
      prop: 'title',
    },
    {
      label: '新闻图片',
      prop: 'pictureImage',
    },
    {
      label: '创建人',
      prop: 'name',
    },
    {
      label: '新闻发表时间',
      prop: 'createTime',
    },
    {
      label: '状态',
      prop: 'status',
    },
  ],
  columnsSchema: statusChange => {
    return {
      新闻图片: {
        propsHandler({ row }) {
          return { imgSrc: row.pictureImage }
        },
        component: Vue.extend({
          props: {
            imgSrc: {
              type: String,
              default: '',
            },
          },
          render(h) {
            return h('img', {
              attrs: {
                src: this.imgSrc,
              },
              style: {
                width: '200px',
                height: '100px',
              },
            })
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
          fixed: 'right',
          width: 200,
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
}
