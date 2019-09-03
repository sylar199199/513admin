<template>
  <div class="school-survey">
    <p class="title">
      审批信息
    </p>
    <p class="more" @click="jumpNotice">
      更多<i class="el-icon-caret-right"></i>
    </p>
    <elr-ow class="row-box" v-for="(item, key) in approvalList" :key="key">
      <el-col :span="16">
        <span>
          {{ item.title }}
        </span>
      </el-col>
      <el-col :span="4" class="col-second">
        <span> {{ item.createTime }}</span>
      </el-col>
    </elr-ow>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'c-approval-message',
  data() {
    return {}
  },
  computed: {
    ...mapState('home', {
      approvalList: state => state.approvalList,
    }),
  },
  watch: {},
  methods: {
    jumpNotice() {
      alert(111)
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  position: absolute;
  font-size: 16px;
  font-weight: bold;
}
.school-survey {
  height: 260px;
  border: 1px solid #eeeeee;
  padding: 15px;
}
.row-box {
  margin-top: 40px;
  border-bottom: 1px solid #eeeeee;
  font-size: 16px;
}
col {
  text-align: center;
  /*height: 30px;*/
  /*line-height: 30px;*/
}
.col-second {
  padding-left: 10px;
  /*border-left: 1px solid #eeeeee;*/
}
.more {
  color: dimgray;
  font-size: 14px;
  float: right;
}
</style>
