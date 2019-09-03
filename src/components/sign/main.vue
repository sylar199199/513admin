<template>
  <div>
    <p class="title">
      登录
    </p>
    <base-form
      :form-data="formData"
      :form-configs="_formConfigs"
      :rules="rules"
      ref="baseForm"
    />
  </div>
</template>
<script>
import BaseForm from '@components/base/base-form'
import { formData, rules, formConfigs } from '@components/sign/form-config'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'sign',
  components: {
    'base-form': BaseForm,
  },
  data() {
    return {
      formData,
      rules,
      formConfigs,
    }
  },
  computed: {
    ...mapState('auth', {
      verifiCode: state => state.verifiCode,
    }),
    _formConfigs() {
      return formConfigs(this)
    },
  },
  methods: {
    ...mapActions('auth', ['getVerifiCode', 'login']),
    // 登陆
    handleSubmit() {
      const baseFormComp = this.$refs.baseForm
      baseFormComp.validate(async data => {
        // validate成功发送请求
        ;(await this.login(data)) && this.$router.replace('/home')
      })
    },
  },
  mounted() {
    this.getVerifiCode()
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 28px;
  text-align: center;
  line-height: 50px;
  height: 50px;
}
</style>
