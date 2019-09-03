import Vue from 'vue'
import { CActionBtn, CSwitch } from '@components/base/base-table-related'

export default {
  columns: [
    {
      label: '课程名称',
      prop: 'courseName',
      width: 150,
      fixed: 'left',
    },
    {
      label: '课程图片',
      prop: 'coursePicture',
      width: 150,
      fixed: 'left',
    },
    {
      label: '学校',
      prop: 'schoolName',
    },
    {
      label: '老师名称',
      prop: 'teacherName',
    },
    {
      label: '学分',
      prop: 'courseScore',
    },
    {
      label: '课程时长',
      prop: 'courseTime',
    },
    {
      label: '创建时间',
      prop: 'createTime',
    },
    {
      label: '课程类型',
      prop: 'type',
      width: 150,
    },
    {
      label: '审核状态',
      prop: 'auditStatus',
      width: 150,
    },
    {
      label: '发布状态',
      prop: 'releaseStatus',
      width: 150,
    },
  ],
  columnsSchema: statusChange => {
    return {
      课程图片: {
        propsHandler({ row }) {
          return { imgSrc: row.coursePicture }
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
                width: '100px',
                height: '50px',
              },
            })
          },
        }),
      },
      // 课程类型: {
      //   width: 200,
      //   propsHandler({ row }) {
      //     const config = {
      //       '1': '学分课 ',
      //       '2': '公开课',
      //       '3': '选修课',
      //     }
      //     return { config, row }
      //   },
      //   component: Vue.extend({
      //     props: {
      //       config: {
      //         type: Object,
      //         default: () => {},
      //       },
      //       row: {
      //         type: Object,
      //         default: () => {},
      //       },
      //     },
      //     render(h) {
      //       return h(
      //         'span',
      //         null,
      //         (this.row.type && this.config[this.row.type]) || '',
      //       )
      //     },
      //   }),
      // },
      // 发布状态: {
      //   width: 100,
      //   propsHandler({ row }) {
      //     const config = {
      //       activeText: '启用',
      //       inactiveText: '禁用',
      //       initValue: row.releaseStatus === '启用',
      //       confirmActiveText: '启用',
      //       confirmInactiveText: '禁用',
      //     }
      //     return { row, config }
      //   },
      //   component: CSwitch,
      //   listeners: {
      //     'switch-change': ({ row, cb }) => {
      //       statusChange(row, cb)
      //     },
      //   },
      // },
    }
  },
  // 操作cols
  actions: () => {
    return {
      columnsHandler(cols) {
        return cols.concat({
          label: '操作',
          align: 'center',
          width: 280,
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
                      type:
                        this.row.boutiqueCourse === '非精选'
                          ? 'default'
                          : 'success',
                      size: 'mini',
                    },
                    style: {
                      display:
                        this.row.role === 'administrator' ||
                        this.row.role === 'operator' ||
                        this.row.role === 'salesperson'
                          ? 'inline'
                          : 'none',
                    },
                    on: {
                      click: () => {
                        this.$emit('action-click', this.row, 'edit')
                      },
                    },
                  },
                  '加精',
                ),
                h(
                  'el-button',
                  {
                    props: {
                      type:
                        this.row.releaseStatus === '未发布'
                          ? 'primary'
                          : 'default',
                      size: 'mini',
                    },
                    on: {
                      click: () => {
                        this.$emit('action-click', this.row, 'release')
                      },
                    },
                  },
                  this.row.releaseStatus === '未发布' ? '上架' : '下架',
                ),
                h(
                  'el-button',
                  {
                    props: {
                      type: 'primary',
                      size: 'mini',
                    },
                    on: {
                      click: () => {
                        this.$emit('action-click', this.row, 'preview')
                      },
                    },
                  },
                  '预览',
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
