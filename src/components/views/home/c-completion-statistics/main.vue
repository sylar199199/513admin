<template>
  <div class="c-completion-statistics">
    <p class="title">
      校企概况
    </p>
    <div class="e-chart-box">
      <v-chart :options="option" :autoresize="true" />
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/markLine'
import { mapState } from 'vuex'

export default {
  name: 'c-completion-statistics',
  components: {
    'v-chart': ECharts,
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月',
            ],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [1],
        color: ['#6fb0ea', '#62c4c7', '#b2a3da'],
      },
    }
  },
  computed: {
    ...mapState('home', {
      completionData: ({ completionStatisticsData }) => {
        return Object.keys(completionStatisticsData).map(key => {
          const data = {
            name: key,
            data: Object.keys(completionStatisticsData[key]).map(_key => {
              return completionStatisticsData[key][_key]
            }),
            type: 'bar',
            stack: (key === '教师数量' && '教师') || '课程',
          }
          if (key === '校内课程')
            data.markLine = {
              lineStyle: {
                normal: {
                  type: 'dashed',
                },
              },
              data: [[{ type: 'min' }, { type: 'max' }]],
            }
          return data
        })
      },
    }),
  },
  watch: {
    completionData(cur) {
      this.$set(this.option, 'series', cur)
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
}
.c-completion-statistics {
  height: 260px;
  border: 1px solid #eeeeee;
  padding: 15px;
  .e-chart-box {
    width: 100%;
    height: 217px;
  }
}
</style>
