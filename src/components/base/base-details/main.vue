<template>
  <el-dialog
    :title="(showRelate.modalType = '我的信息 ')"
    :visible.sync="showRelate.show"
    :close-on-click-modal="false"
    @close="cancel"
    width="600px"
    top="5vh"
  >
    <div class="content">
      <span class="essential-head-txt">头像</span>
      <div class="head-img">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :with-credentials="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div><span class="head-warning">上传头像大小不超过300KB</span></div>
      <base-form
        :form-data="formData"
        :rules="rules"
        :form-configs="createConfig(formConfigs)"
        ref="form"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="ok">
        确 定
      </el-button>
      <el-button :loading="loading" @click="cancel">
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
} from '@components/base/base-details/form-config'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { SET_MODAL_RELATE } from '@store/modules/base-details/mutation-types'
import { SET_IMAGE_RELATE } from '@store/modules/base-details/mutation-types'

export default {
  name: 'c-teacher-modal',
  components: {
    'base-form': BaseForm,
  },
  data() {
    return {
      dialogVisible: false,
      formConfigs,
      formData,
      rules,
      loading: false,
      uploadUrl: process.env.VUE_APP_BASE_URL + '/file/upload',
    }
  },
  computed: {
    ...mapState('base-details', {
      // modal框显示隐藏依赖的数据
      showRelate: ({ show, addOrEdit }) => {
        return {
          show: show.addOrEdit,
          modalType: addOrEdit,
        }
      },
      // 当前编辑的我的信息
      myDetails: state => state.myDetails,
      imageUrl: state => state.myDetails.portraitImage,
    }),
    ...mapGetters('school-teacher', {
      createConfig: 'getDepartment',
    }),
    currentTeacher: ({ currentTeacher }) => currentTeacher,
  },
  watch: {
    myDetails({ name, schoolName, phone, email, address }) {
      this.formData = {
        name,
        schoolName,
        phone,
        email,
        address,
      }
    },
  },
  methods: {
    ...mapMutations('base-details', [SET_MODAL_RELATE]),
    ...mapMutations('base-details', [SET_IMAGE_RELATE]),
    ...mapActions('base-details', ['updateManagerId']),
    ...mapActions('auth', ['getLoginInfo']),
    handleAvatarSuccess(res, file) {
      let setimageUrl = res.data[0].url
      this[SET_IMAGE_RELATE]({ setimageUrl })
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.type = file.raw.type
    },
    beforeAvatarUpload(file) {
      this.loading = true
      const isLt300KB = file.size / 1024 < 300
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$message.error('上传头像图片只能是 JPG 或 PNG格式!')
      }
      if (!isLt300KB) {
        this.$message.error('上传头像图片大小不能超过 300KB!')
      }
      this.loading = false
      return (
        (file.type === 'image/jpeg' || file.type === 'image/png') && isLt300KB
      )
    },
    async ok() {
      let data = this.$refs.form.form
      data.portraitImage = this.imageUrl
      delete data.schoolName
      this.loading = true
      let res = await this.updateManagerId(data)
      if (res.ok) {
        this.$message.success('修改成功')
        await this.getLoginInfo()
        this.cancel()
      }
      this.loading = false
    },
    // 取消
    cancel() {
      // 如果是编辑状态，重置编辑获取的校务员信息
      this[SET_MODAL_RELATE]({
        isShow: false,
        key: 'addOrEdit',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.essential-head-txt {
  position: relative;
  top: -50px;
  left: 5px;
  margin-left: 35px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.head-warning {
  display: inline-block;
  margin-left: 260px;
  position: relative;
  top: -50px;
  color: darkgray;
}
.head-img {
  margin-bottom: 15px;
  margin-left: 30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px #eee solid;
  display: inline-block;
  margin-right: 30px;
  overflow: hidden;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.c-teacher-modal {
}
</style>
