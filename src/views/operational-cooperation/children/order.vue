<template>
  <div>
    <div class="c-condition-query">
      <div class="c-search">
        <i></i>
        <el-button
          size="mini"
          type="primary"
          @click="browseFolde"
          v-show="false"
        >
          导出
        </el-button>
        <el-input
          v-model="title"
          clearable
          size="small"
          placeholder="请输入名称"
          class="el-input1"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            type="primary"
            size="small"
            @click="search"
          />
          <el-button
            slot="append"
            icon="el-icon-refresh"
            type="primary"
            size="small"
            @click="reset"
          />
          <el-button
            size="small"
            slot="append"
            :icon="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
            type="primary"
            @click="foldItem"
          />
        </el-input>
      </div>
      <transition name="fade">
        <div v-show="isFold" class="transition-box">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="订单号">
              <el-input
                size="mini"
                v-model="formInline.orderNo"
                placeholder="订单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-select
                v-model="formInline.orderType"
                placeholder="请选择类型"
                size="mini"
              >
                <el-option label="全部" value="0"></el-option>
                <el-option label="购买课程" value="1"></el-option>
                <el-option label="会员" value="2"></el-option>
                <el-option label="充值" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker
                size="mini"
                v-model="formInline.startTime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="至">
              <el-date-picker
                size="mini"
                v-model="formInline.endTime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                v-model="formInline.orderStatus"
                placeholder="请选择状态"
                size="mini"
              >
                <el-option label="待付款" value="0"></el-option>
                <el-option label="已支付" value="1"></el-option>
                <el-option label="待退款" value="2"></el-option>
                <el-option label="支付取消" value="3"></el-option>
                <el-option label="支付关闭" value="4"></el-option>
                <el-option label="支付失败" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源" v-if="isAdministrator">
              <el-select
                v-model="formInline.schoolName"
                placeholder="请选择状态"
                size="mini"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
    <c-table />
    <div class="pagination-box">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total.total"
        :page-size="10"
        :page-sizes="[10, 20]"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import CTable from '@components/views/operational-cooperation/order/c-table'
import { searchCondition } from '@mixins/locality'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'order',
  components: {
    'c-table': CTable,
  },
  data() {
    return {
      text: '',
      page: 1,
      size: 10,
      value: '',
      isFold: false,
      options: [],
      title: '',
      formInline: {
        title: '',
        type: '',
        startTime: '',
        endTime: '',
        orderStatus: '',
        schoolName: '',
        orderType: '0',
      },
    }
  },
  computed: {
    ...mapState('auth', {
      isAdministrator: state => {
        if (
          (state.userInfo && state.userInfo.roleStr === 'administrator') ||
          (state.userInfo && state.userInfo.roleStr === 'operator') ||
          (state.userInfo && state.userInfo.roleStr === 'salesperson')
        ) {
          return true
        } else {
          return false
        }
      },
    }),
    ...mapState('order', {
      total: state => {
        return state
      },
    }),
  },
  methods: {
    ...mapActions('order', ['getSchoolList', 'orderList', 'exportOrder']),
    async search() {
      let params = {}
      !this.isFold
        ? (params = {
            endTime: '',
            orderNo: '',
            orderStatus: '',
            orderType: '0',
            page: this.page,
            schoolName: '',
            size: this.size,
            startTime: '',
            title: this.title,
          })
        : (params = {
            endTime:
              this.formInline.endTime === undefined
                ? ''
                : this.formInline.endTime,
            orderNo:
              this.formInline.orderNo === undefined
                ? ''
                : this.formInline.orderNo,
            orderStatus: this.formInline.orderStatus
              ? ''
              : this.formInline.orderStatus,
            orderType:
              this.formInline.orderType === undefined
                ? '0'
                : this.formInline.orderType,
            page: this.page,
            schoolName:
              this.formInline.schoolName === undefined
                ? '0'
                : this.formInline.schoolName,
            size: this.size,
            startTime:
              this.formInline.startTime === undefined
                ? ''
                : this.formInline.startTime,
            title: this.title,
          })
      if (!this.isAdministrator) {
        delete params.schoolName
      }
      await this.orderList(params)
    },
    async reset() {
      let params = {
        endTime: '',
        orderNo: '',
        orderStatus: '',
        orderType: '0',
        page: this.page,
        schoolName: '',
        size: this.size,
        startTime: '',
        title: '',
      }
      if (!this.isAdministrator) {
        delete params.schoolName
      }
      await this.orderList(params)
      this.isFold = false
    },
    foldItem() {
      this.isFold = !this.isFold
    },
    handleCurrentChange(val) {
      let params = {}
      !this.isFold
        ? (params = {
            endTime: '',
            orderNo: '',
            orderStatus: '',
            orderType: '0',
            page: val,
            schoolName: '',
            size: this.size,
            startTime: '',
            title: this.title,
          })
        : (params = {
            endTime:
              this.formInline.endTime === undefined
                ? ''
                : this.formInline.endTime,
            orderNo:
              this.formInline.orderNo === undefined
                ? ''
                : this.formInline.orderNo,
            orderStatus: this.formInline.orderStatus
              ? ''
              : this.formInline.orderStatus,
            orderType:
              this.formInline.orderType === undefined
                ? '0'
                : this.formInline.orderType,
            page: val,
            schoolName:
              this.formInline.schoolName === undefined
                ? '0'
                : this.formInline.schoolName,
            size: this.size,
            startTime:
              this.formInline.startTime === undefined
                ? ''
                : this.formInline.startTime,
            title: this.title,
          })
      if (!this.isAdministrator) {
        delete params.schoolName
      }
      this.orderList(params)
    },
    async browseFolde() {
      const params = { orderListVoList: this.$store.state.order.orderList.list }
      await this.exportOrder(params)
    },
  },
  async mounted() {
    if (this.isAdministrator) {
      const res = await this.getSchoolList()
      this.options = res.map(obj => {
        return {
          label: obj.schoolName,
          value: obj.sign,
        }
      })
    }
    let params = {
      endTime: '',
      orderNo: '',
      orderStatus: '',
      orderType: '0',
      page: this.page,
      schoolName: '',
      size: this.size,
      startTime: '',
      title: '',
    }
    if (!this.isAdministrator) {
      delete params.schoolName
    }
    await this.orderList(params)
  },
}
</script>

<style scoped lang="scss">
.c-condition-query {
  align-items: center;
  padding: 20px;
  box-shadow: 0 0 2px #999999;
  margin-bottom: 20px;
  .c-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-input-group__prepend {
      background-color: $maincolor;
    }
    .el-input1 {
      width: 300px;
    }
  }
}
.pagination-box {
  display: flex;
  justify-content: center;
  margin: 10px 0 0;
}
.transition-box {
  margin-top: 30px;
}
</style>
