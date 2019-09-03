import Vue from 'vue'

export default {
  columns: [
    {
      label: '订单号',
      prop: 'orderNum',
      width: 150,
      fixed: 'left',
    },
    {
      label: '名称',
      prop: 'title',
    },
    {
      label: '类型',
      prop: 'type',
    },
    {
      label: '商品价格',
      prop: 'price',
    },
    {
      label: '实付金额',
      prop: 'payPrice',
    },
    {
      label: '来源',
      prop: 'schoolName',
    },
    {
      label: '状态',
      prop: 'orderStatus',
      width: 150,
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: 150,
    },
    {
      label: '支付时间',
      prop: 'payTime',
      width: 150,
    },
    {
      label: '支付方式',
      prop: 'payType',
      width: 150,
    },
  ],
  columnsSchema: statusChange => {
    return {}
  },
  // 操作cols
  actions: () => {
    return {}
  },
}
