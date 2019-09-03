import Vue from 'vue'

export default {
  columns: [
    {
      label: '课程名称',
      prop: 'courseName',
      width: 150,
    },
    {
      label: '图片',
      prop: 'coursePicture',
    },
    {
      label: '学校',
      prop: 'schoolName',
    },
    {
      label: '学分',
      prop: 'courseScore',
    },
    {
      label: '教师姓名',
      prop: 'teacherName',
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
      label: '价格',
      prop: 'coursePrice',
    },
    {
      label: '精选课程',
      prop: 'boutiqueCourse',
    },
    {
      label: '发布状态',
      prop: 'releaseStatus',
    },
  ],
  columnsSchema: () => {
    return {
      图片: {
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
  // columnsProps: {
  //   width: 120,
  // },
  // 列宽设置
}
