.
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
} from '@components/views/operational-cooperation/cooperative-organization/c-modal/form-config.js'
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
      courseIdSign: this.$route.params.courseIdSign,
      providerSign: this.$route.params.providerSign,
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
    ...mapState('add-course', {
      //供课学校机构数据
      schoolIdSignState: state => {
        return state.addOrganizationParamsSchool
      },
      //合作机构数据
      courseIdSignState: state => {
        return state.addOrganizationParamsCourse
      },
    }),
  },
  methods: {
    ...mapActions('add-course', {
      getAddCourseSelectlist: 'getAddCourseSelectlist',
      addCoueseIntroduce: 'addCoueseIntroduce',
      getAddCourseDetailById: 'getAddCourseDetailById',
    }),
    ...mapMutations('school-student', [
      SET_MODAL_RELATE,
      RESET_CURRENT_STUDENT,
    ]),
    async ok() {
      let addParams = {}
      addParams.providerSign = this.providerSign
      addParams.courseIdSign = this.courseIdSign
      addParams.customerSign = this.$refs.form.form.schoolName
      addParams.endTime = this.$refs.form.form.date[0]
      addParams.startTime = this.$refs.form.form.date[1]
      if (
        addParams.endTime !== undefined ||
        addParams.startTime !== undefined
      ) {
        const res = await this.addCoueseIntroduce(addParams)
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
    const res = await this.getAddCourseSelectlist(
      this.$route.params.providerSign,
    )
    if (res.ok) {
      this.moduleType = res.data
    }
  },
}
</script>
<style scoped>
.button-select {
  float: right;
  margin-right: 450px;
}
</style>
