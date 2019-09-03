<template>
  <div class="school-survey">
    <div class="container">
      <p class="title">
        校企信息
      </p>
      <div>
        <div class="row-box">
          <div class="item-title">
            <span>
              名称
            </span>
          </div>
          <div class="col-second">
            <span> {{ enterpriseData && enterpriseData.schoolName }}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="item-title">
            <span>联系人</span>
          </div>
          <el-col class="col-second">
            <span>{{ enterpriseData && enterpriseData.manageName }}</span>
          </el-col>
        </div>
        <div class="row-box">
          <div class="item-title">
            <span>
              联系手机
            </span>
          </div>
          <div class="col-second">
            <span>{{ enterpriseData && enterpriseData.phone }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'c-school-enterprise',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('home', {
      enterpriseData: state => state.schoolEnterpriseData,
    }),
  },
  watch: {},
}
</script>
<style lang="scss" scoped>
.school-survey {
  height: 260px;
  overflow: hidden;
  .container {
    width: 1200px;
    margin: 0 auto;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .row-box {
      div {
        width: 350px;
      }
      margin-top: 40px;
      display: flex;
      font-size: 14px;
      border-bottom: 1px solid #eeeeee;
      .col-second {
        margin-left: 0px;
        span {
          text-align: left;
        }
      }
    }
  }
}
</style>
