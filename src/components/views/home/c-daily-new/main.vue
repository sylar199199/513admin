<template>
  <div class="c-daily-new">
    <p>
      <span class="title">
        每日新增
      </span>
    </p>
    <div class="e-chart-box">
      <v-chart :options="option" :autoresize="true" />
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import { mapState } from 'vuex'

export default {
  name: 'c-daily-new',
  components: {
    'v-chart': ECharts,
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#505765',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {},
          },
        ],
        color: ['#6fb0ea', '#62c4c7', '#b2a3da'],
      },
    }
  },
  computed: {
    ...mapState('home', {
      tableData: ({ registerUserCountList }) => {
        const list = []
        const xAxisData = registerUserCountList.map(item => {
          list.push(item.count)
          return item.createTime
        })
        return {
          list: list.reverse(),
          xAxisData: xAxisData.reverse(),
        }
      },
    }),
  },
  watch: {
    tableData(cur) {
      this.option.series[0].data = cur.list
      this.option.xAxis.data = cur.xAxisData
    },
  },
}
</script>
<style lang="scss" scoped>
.c-daily-new {
  height: 330px;
  border: 1px solid #eeeeee;
  padding: 15px;
  p {
    padding-bottom: 10px;
    margin: 0 20px;
    border-bottom: 1px solid #eeeeee;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .e-chart-box {
    width: 100%;
    height: 287px;
  }
}
</style>
