import Vue from 'vue'
import { CActionBtn, CSwitch } from '@components/base/base-table-related'

export default {
  columns: [
    {
      label: '合作机构',
      prop: 'schoolName',
      width: 150,
      fixed: 'left',
    },
    {
      label: '合作时间自',
      prop: 'startTime',
    },
    {
      label: '合作时间至',
      prop: 'endTime',
    },
    {
      label: '状态',
      prop: 'status',
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
    }
  },
  // 操作cols
  actions: () => {
    return {}
  },
}
