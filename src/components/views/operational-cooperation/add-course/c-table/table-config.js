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
    },
    {
      label: '价格',
      prop: 'coursePrice',
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
      label: '学校名',
      prop: 'schoolName',
      width: 150,
    },
    {
      label: '老师名 ',
      prop: 'teacherName',
      width: 150,
    },
    {
      label: '类型',
      prop: 'type',
      width: 150,
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
