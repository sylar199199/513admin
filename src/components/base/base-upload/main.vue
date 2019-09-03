<template>
  <div>
    <el-upload
      :file-list="fileList"
      :show-file-list="false"
      :action="baseSrc + suffixSrc"
      :with-credentials="true"
      :headers="{ contentType: 'multipart/form-data' }"
      :accept="accept"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :on-change="handleChange"
    >
      <el-button size="small" type="primary">
        点击上传
      </el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'base-upload',
  props: {
    accept: {
      type: String,
      default: '',
      required: true,
    },
    prop: {
      type: String,
      default: '',
    },
    sizeLimit: {
      type: Number,
      default: 5,
    },
    suffixSrc: {
      type: String,
      default: '/file/upload',
    },
  },
  data() {
    return {
      baseSrc: process.env.VUE_APP_BASE_URL,
      fileList: [],
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1)
    },
    uploadSuccess(response) {
      if (response.code === 1) {
        if (this.prop === '') {
          this.$emit('handle-upload')
        } else {
          this.$emit('handle-upload', {
            prop: this.prop,
            ...response.data[0],
          })
        }
        this.$message.success(response.msg)
        return
      }
      this.$message.error(response.msg)
    },
    beforeUpload(file) {
      const isWthinLimit = file.size / 1024 < 300
      if (!isWthinLimit) {
        this.$message.error(`上传文件大小不能超过 300KB!`)
      }
      return isWthinLimit
    },
  },
}
</script>
<style lang="scss" scoped></style>
