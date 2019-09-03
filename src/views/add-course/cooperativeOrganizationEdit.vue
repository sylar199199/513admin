<template>
  <div>
    <base-form
      :form-data="formData"
      :rules="rules"
      :form-configs="_formConfigs"
      ref="form"
    />
    <span slot="footer" class="button-select">
      <el-button type="primary" :loading="loading" @click="ok">
        确 定
      </el-button>
      <el-button @click="cancel">
        取 消
      </el-button>
    </span>
  </div>
</template>

<script>
import BaseForm from '../../components/base/base-form'
import {
  formConfigs,
  formData,
  rules,
} from '@components/views/operational-cooperation/cooperative-organizationEdit/c-modal/form-config.js'
import {
  SET_MODAL_RELATE,
  RESET_CURRENT_STUDENT,
} from '@store/modules/school-student/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'
import { RESET_CURRENT_SCHOOL_DATA } from '@store/modules/school-enterprise-management/mutation-types'
export default {
  name: 'cooperative-organization',
  components: {
    'base-form': BaseForm,
  },
  data() {
    return {
      resFormlist: null,
      providerSign: this.$route.params.providerSign,
      courseIdSign: this.$route.params.courseIdSign, // 课程签名从路由中获取
      sign: this.$route.params.sign,
      moduleType: {},
      formConfigs,
      formData,
      rules,
      loading: false,
    }
  },
  computed: {
    _formConfigs() {
      const types = Object.keys(this.moduleType).map(key => {
        return {
          label: this.moduleType[key].schoolName,
          value: this.moduleType[key].sign,
        }
      })
      return this.formConfigs(types)
    },
  },
  methods: {
    ...mapActions('add-course', {
      getAddCourseSelectlist: 'getAddCourseSelectlist',
      updateCoueseIntroduce: 'updateCoueseIntroduce',
      getAddCourseDetailById: 'getAddCourseDetailById',
      getAddCourseDetailFormlist: 'getAddCourseDetailFormlist',
    }),
    ...mapActions('add-course', ['freshAddCourseList']),
    ...mapMutations('school-student', [
      SET_MODAL_RELATE,
      RESET_CURRENT_STUDENT,
    ]),
    async ok() {
      this.$refs.form.validate(async ({ date, ...data }) => {
        const [contractStartTime, contractEndTime] = date
      })
      let addParams = {}
      addParams.courseIdSign = this.courseIdSign
      addParams.customerSign = this.$refs.form.form.schoolName
      addParams.providerSign = this.providerSign
      addParams.isSign = this.sign
      addParams.endTime = this.$refs.form.form.date[0]
      addParams.startTime = this.$refs.form.form.date[1]
      if (
        addParams.endTime !== undefined ||
        addParams.startTime !== undefined
      ) {
        const res = await this.updateCoueseIntroduce(addParams)
        if (res) {
          this[SET_MODAL_RELATE]({
            isShow: true,
            key: 'addOrEdit',
          })
          let params = {}
          params.courseIdSign = this.courseIdSign //课程签名
          params.providerIdSign = this.providerSign //提供学校签名
          await this.getAddCourseDetailById(params)
          this.$router.push({
            path: '/operationalCooperation/provideCourseManagement/addCourse',
          })
        }
      }
    },
    cancel() {
      this[SET_MODAL_RELATE]({
        isShow: true,
        key: 'addOrEdit',
      })
      this.$router.push({
        path: '/operationalCooperation/provideCourseManagement/addCourse',
      })
    },
  },
  async mounted() {
    const res = await this.getAddCourseSelectlist(this.providerSign)
    if (res.ok) {
      this.moduleType = res.data
    }
    let params = {}
    params.sign = this.sign
    const resFormlist = await this.getAddCourseDetailFormlist(params)
    this.resFormlist = resFormlist
    this.$refs.form.form.schoolName = resFormlist.data.customerIdSign
    this.$refs.form.form.date = [
      new Date(resFormlist.data.startTime),
      new Date(resFormlist.data.endTime),
    ]
    this.$refs.form.form.sign = resFormlist.data.customerIdSign
  },
}
</script>
<style scoped>
.button-select {
  float: right;
  margin-right: 450px;
}
</style>
