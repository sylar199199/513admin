<template>
  <el-form
    label-position="right"
    size="small"
    label-width="80px"
    :model="formData"
    :rules="rules"
    ref="form"
  >
    <el-form-item :label="config.logo.label" :prop="config.logo.key">
      <el-row :gutter="10">
        <el-col :span="16">
          <el-input
            :placeholder="config.logo.placeholder"
            v-model="formData.logo"
            disabled
          />
        </el-col>
        <el-col :span="6">
          <base-upload
            prop="logo"
            accept="image/jpg,image/gif,image/png,image/jpeg"
            @handle-upload="handleUplaod"
          />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item
      :label="config.backgroundImage.label"
      :prop="config.backgroundImage.key"
    >
      <el-row :gutter="10">
        <el-col :span="16">
          <el-input
            :placeholder="config.backgroundImage.placeholder"
            v-model="formData.backgroundImage"
            disabled
          />
        </el-col>
        <el-col :span="6">
          <base-upload-background
            prop="backgroundImage"
            accept="image/jpg,image/gif,image/png,image/jpeg"
            @handle-upload="handleUplaod"
          />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item :label="config.title.label" :prop="config.title.key">
      <el-row :gutter="10">
        <el-col :span="16">
          <el-input
            :placeholder="config.title.placeholder"
            v-model="formData.title"
          />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">
        提 交
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import BaseUpload from '@components/base/base-upload'
import BaseUploadBackground from '@components/base/base-upload-ground'
import { checkTitle } from '@utils/base-validators'

export default {
  name: 'c-form',
  components: {
    'base-upload': BaseUpload,
    'base-upload-background': BaseUploadBackground,
  },
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formData: {
        logo: '',
        backgroundImage: '',
        title: '',
      },
      config: {
        logo: {
          key: 'logo',
          label: 'LOGO',
          placeholder: ' 点击上传LOGO，大小不超过300KB',
        },
        backgroundImage: {
          key: 'backgroundImage',
          label: '背景图',
          placeholder: '点击上传主页背景，大小不超过2MB',
        },
        title: {
          key: 'title',
          label: '标题',
          placeholder: '请输入标题',
        },
      },
      rules: {
        logo: [
          {
            required: true,
            message: '请上传logo',
          },
        ],
        backgroundImage: [
          {
            required: true,
            message: '请上传背景图片',
          },
        ],
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          },
          { validator: checkTitle, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    _form() {
      return this.form
    },
  },
  watch: {
    _form: {
      handler(cur) {
        this.formData = cur
      },
      immediate: true,
    },
  },
  methods: {
    handleUplaod({ prop, url }) {
      this.formData[prop] = url
      this.$emit('handle-change', { prop, url })
    },
    submit() {
      // debugger
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //     this.$emit('handle-post', this.formData)
      //   }
      // })
      if (this.formData.title !== '') {
        this.$emit('handle-post', this.formData)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.index-management {
}
</style>
