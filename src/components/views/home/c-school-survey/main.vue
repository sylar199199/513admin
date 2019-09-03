<template>
  <div class="school-survey">
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
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/funnel'
import 'echarts/lib/component/tooltip'
import { mapState } from 'vuex'

export default {
  name: 'school-survey',
  components: {
    'v-chart': ECharts,
  },
  data() {
    return {
      option: {
        title: {
          text: '同名数量统计',
          subtext: '纯属虚构',
          x: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: '姓名',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: [],
          },
        ],
        color: ['#6fb0ea', '#62c4c7', '#b2a3da'],
      },
    }
  },
  computed: {
    ...mapState('home', {
      surveyData: state => state.indexCount,
    }),
  },
  watch: {
    surveyData(cur) {
      this.option.series[0].data = Object.keys(cur).map(key => {
        return {
          name: key,
          value: cur[key],
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
}
.school-survey {
  height: 260px;
  border: 1px solid #eeeeee;
  padding: 15px;
  .e-chart-box {
    width: 100%;
    height: 217px;
    padding: 15px 10px;
    margin-left: 20px;
  }
}
</style>
