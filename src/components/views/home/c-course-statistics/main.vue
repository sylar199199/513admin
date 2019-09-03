<template>
  <div class="c-course-statistics">
    <p class="title">
      {{ '课程统计' }}
    </p>
    <div class="e-chart-box">
      <v-chart :options="option" :autoresize="true" />
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/funnel'
import 'echarts/lib/component/tooltip'
import { mapState } from 'vuex'

export default {
  name: 'c-course-statistics',
  components: {
    'v-chart': ECharts,
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            data: [],
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '18',
                  fontWeight: 'bold',
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
        ],
        color: ['#6fb0ea', '#62c4c7', '#b2a3da'],
      },
    }
  },
  computed: {
    ...mapState('home', {
      courseCount: ({ courseCount }) => {
        return Object.keys(courseCount).map(key => {
          return {
            name: key,
            value: courseCount[key],
          }
        })
      },
    }),
  },
  watch: {
    courseCount(cur) {
      this.option.series[0].data = cur
    },
  },
}
</script>
<style lang="scss" scoped>
.c-course-statistics {
  height: 260px;
  border: 1px solid #eeeeee;
  padding: 15px;
  .e-chart-box {
    width: 100%;
    height: 217px;
    padding: 15px 10px;
    margin-left: 20px;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
