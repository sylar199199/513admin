import Vue from 'vue'
import { CActionBtn, CSwitch } from '@components/base/base-table-related'

export default {
  columns: [
    {
      label: '课程名称',
      prop: 'courseName',
      fixed: 'left',
    },
    {
      label: '课程图片',
      prop: 'coursePicture',
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
    },
    {
      label: '审核状态',
      prop: 'auditStatus',
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
    }
  },
  // 操作cols
  actions: () => {
    return {
      columnsHandler(cols) {
        return cols.concat({
          label: '操作',
          align: 'center',
          width: 300,
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
                      type: 'success',
                      size: 'mini',
                    },
                    style: {
                      display:
                        this.row.auditStatus !== '待审核' ? 'none' : 'inline',
                    },
                    on: {
                      click: () => {
                        this.$emit('action-click', this.row, 'agree')
                      },
                    },
                  },
                  '审核通过',
                ),
                h(
                  'el-button',
                  {
                    props: {
                      type: 'warning',
                      size: 'mini',
                    },
                    style: {
                      display:
                        this.row.auditStatus !== '待审核' ? 'none' : 'inline',
                    },
                    on: {
                      click: () => {
                        this.$emit('action-click', this.row, 'reject')
                      },
                    },
                  },
                  '拒绝审核',
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
