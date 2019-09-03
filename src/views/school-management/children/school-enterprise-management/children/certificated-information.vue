<template>
  <div class="certificated-information">
    <div class="content">
      <c-upload-img
        v-for="(item, key) in uploadImgData"
        :key="key"
        :prop-name="item"
        v-bind="option"
        :on-success="handleSuccess(item.prop)"
        :image-url="previewList[item.prop]"
      />
      <c-upload-file
        v-bind="option"
        :file-url="previewList.contractPath"
        :file-name="previewList.contractPathFile"
        :on-success="handleSuccess('contractPath')"
        accept="application/pdf"
      />
    </div>
    <el-button type="primary" @click="submit" class="submit-style">
      上传
    </el-button>
    <el-button type="default" @click="goBack" class="cancel-style">
      返回
    </el-button>
  </div>
</template>
<script>
import CUploadImg from '@components/views/school-management/school-enterprise-management/c-upload-img'
import CUploadFile from '@components/views/school-management/school-enterprise-management/c-upload-file'
import { mapActions } from 'vuex'

export default {
  name: 'certificated-information',
  components: {
    'c-upload-img': CUploadImg,
    'c-upload-file': CUploadFile,
  },
  data() {
    return {
      fileData: {},
      changedFile: {},
      type: '',
      uploadImgData: [
        { name: '校徽', prop: 'crest' },
        { name: '营业执照', prop: 'licenseImage' },
        { name: '身份证正面', prop: 'idCardFrontImage' },
        { name: '身份证反面', prop: 'idCardContraryImage' },
      ],
      option: {
        action: process.env.VUE_APP_BASE_URL + '/file/upload',
        'before-upload': this.beforeAvatarUpload,
        'with-credentials': true,
        accept: 'image/jpg,image/gif,image/png,image/jpeg',
      },
    }
  },
  computed: {
    previewList() {
      return {
        ...this.fileData,
        ...this.changedFile,
      }
    },
  },
  methods: {
    ...mapActions('school-enterprise-management', [
      'getAuthDataById',
      'updateAuthData',
      'addAuthData',
    ]),
    handleSuccess(prop) {
      return res => {
        this.$set(this.changedFile, prop, res.data[0].url)
        if (prop === 'contractPath') {
          this.$set(this.fileData, 'contractPathFile', res.data[0].fileName)
        }
      }
    },
    beforeAvatarUpload(file) {
      // TODO: 暂时先不做
      // 过滤处理文件类型以及文件的大小
      // console.log(file)
    },
    goBack() {
      this.$router.push({
        path: '/schoolManagement/schoolEnterpriseManagement',
      })
    },
    async submit() {
      ;(await this[(this.type === 'edit' && 'updateAuthData') || 'addAuthData'](
        {
          ...this.changedFile,
        },
      )) &&
        this.$message.success(
          `${(this.type === 'edit' && '更新') || '新增'}成功！`,
        )
    },
  },
  async mounted() {
    const res =
      this.$route.query.sign &&
      (await this.getAuthDataById(this.$route.query.sign))
    if (res && res.ok) {
      if (res.data) {
        this.fileData = res.data
        this.type = 'edit'
        this.changedFile.sign = res.data.idSign
      } else {
        this.fileData = {}
        this.changedFile.sign = this.$route.query.sign
      }
    } else {
      this.$router.replace('/schoolManagement/schoolEnterpriseManagement')
    }
  },
}
</script>
<style lang="scss" scoped>
.certificated-information {
  padding: 30px;
  .content {
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
  }
}
.submit-style {
  margin-top: 20%;
  margin-left: 36%;
  margin-right: 30px;
}
</style>
