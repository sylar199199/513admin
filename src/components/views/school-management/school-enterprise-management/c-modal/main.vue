<template>
  <el-dialog
    title="新增校企"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="cancel"
    width="930px"
    top="5vh"
  >
    <div class="content">
      <base-form
        :form-data="formData"
        :rules="rules"
        :form-configs="_formConfigs"
        ref="form"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="ok">
        确 定
      </el-button>
      <el-button @click="cancel">
        取 消
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import BaseForm from '@components/base/base-form'
import {
  formConfigs,
  formData,
  rules,
} from '@components/views/school-management/school-enterprise-management/c-modal/form-config.js'
import { mapState, mapActions, mapMutations } from 'vuex'
import { RESET_CURRENT_SCHOOL_DATA } from '@store/modules/school-enterprise-management/mutation-types'

export default {
  name: 'c-modal',
  components: {
    'base-form': BaseForm,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      formConfigs,
      formData,
      rules,
      loading: false,
    }
  },
  computed: {
    ...mapState('school-administrator', {
      salesList: state => {
        return state.salesList
      },
    }),
    ...mapState('school-enterprise-management', {
      currentSchoolData: state => state.currentSchoolData,
    }),
    _show() {
      return this.show
    },
    _formConfigs() {
      return this.formConfigs(this.salesList)
    },
  },
  watch: {
    _show(cur) {
      this.dialogVisible = cur
    },
    currentSchoolData(data) {
      // 处理数据
      if (data.salesName) {
        const sale = this.salesList.find(item => {
          return item.name === data.salesName
        })
        delete data.salesName
        delete data.createName
        if (sale) {
          this.formData = {
            ...data,
            salesIdSign: sale.sign,
          }
        } else {
          this.formData = {
            ...data,
          }
        }
      } else {
        this.formData = data
      }
    },
  },
  methods: {
    ...mapActions('school-enterprise-management', [
      'addSchool',
      'updateSchool',
    ]),
    ...mapMutations('school-enterprise-management', [
      RESET_CURRENT_SCHOOL_DATA,
    ]),
    ok() {
      this.$refs.form.validate(async ({ date, ...data }) => {
        let [contractStartTime, contractEndTime] = date
        this.loading = true
        if (!data.hasOwnProperty('sign')) {
          const res = await this.addSchool({
            contractStartTime,
            contractEndTime,
            ...data,
          })
          if (res) {
            this.cancel()
          }
        } else {
          delete data.salesName
          delete data.createName
          let forDate = data
          const res = await this.updateSchool({
            contractStartTime,
            contractEndTime,
            ...forDate,
          })
          if (res) {
            debugger
            this.cancel()
          }
        }
        // ;(await this[
        //   (!data.hasOwnProperty('sign') && 'addSchool') || 'updateSchool'
        // ]({
        //   contractStartTime,
        //   contractEndTime,
        //   ...data,
        // })) && this.cancel()
        this.loading = false
      })
    },
    cancel() {
      this.$refs.form.reset()
      this[RESET_CURRENT_SCHOOL_DATA]()
      this.$emit('handle-change')
    },
  },
}
</script>
<style lang="scss" scoped>
.c-modal {
}
</style>
