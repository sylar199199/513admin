<template>
  <div class="news-add">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="mini"
      :rules="rules"
    >
      <span class="essential-head-txt">新闻图片</span>
      <div class="headImg">
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
      <div class="tips-message">
        <ul>
          <li>说明:</li>
          <li>新闻图片，大小不能超过300KB，尺寸建议750*430像素</li>
        </ul>
      </div>
      <el-form-item label="新闻类型" prop="type">
        <el-select
          style="width:30%"
          v-model="form.category"
          placeholder="请选择新闻类型"
        >
          <el-option
            v-for="(item, key) in optList"
            :key="key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="新闻标题" prop="title">
        <el-input style="width:30%" v-model="form.title" />
      </el-form-item>
      <el-form-item label="新闻内容">
        <c-markdown
          ref="markdown"
          :toolbars="toolbars"
          v-model="form.content"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
        />
      </el-form-item>
    </el-form>
    <div class="button-style">
      <el-button type="primary" size="mini" @click="handleSubmit()">
        保存
      </el-button>
      <el-button type="default" size="mini" @click="goBack()">
        取消
      </el-button>
    </div>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import toolbars from '@configs/markdown-config'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { checkTitle } from '@utils/base-validators'
import { SET_IMAGE_RELATE } from '@store/modules/news-management/mutation-types'

export default {
  name: 'bulletin-edit',
  components: {
    'c-markdown': mavonEditor,
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_URL + '/file/upload',
      sign: '',
      form: {
        content: '',
        title: '',
        category: '1',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { validator: checkTitle, trigger: 'blur' },
        ],
        category: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
      typeList: [
        {
          label: 'PC',
          value: '1',
        },
        {
          label: 'APP',
          value: '2',
        },
        {
          label: 'PC和APP',
          value: '3',
        },
      ],
      optList: [
        {
          label: '公司动态',
          value: '1',
        },
        {
          label: '行业新闻',
          value: '2',
        },
      ],
      toolbars,
    }
  },
  computed: {
    ...mapState('news-management', {
      imageUrl: state => {
        return state.newsDetails.pictureImage
      },
    }),
  },
  methods: {
    ...mapActions('news-management', ['addNews', 'getNewsList']),
    ...mapMutations('news-management', [SET_IMAGE_RELATE]),
    ...mapActions('app', ['uploadFile']),
    handleAvatarSuccess(res, file) {
      let setimageUrl = res.data[0].url
      this[SET_IMAGE_RELATE]({ setimageUrl })
      this.type = file.raw.type
    },
    beforeAvatarUpload(file) {
      const isLt300KB = file.size / 1024 < 300
      this.loading = true
      if (!isLt300KB) {
        this.$message.error('上传APP图片大小不能超过 300KB!')
      }
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$message.error('上传图片只能是 JPG 或 PNG格式!')
      }
      this.loading = false
      return (
        (file.type === 'image/jpeg' || file.type === 'image/png') && isLt300KB
      )
    },
    async handleSubmit() {
      let params = {
        pictureImage: this.imageUrl,
        ...this.form,
      }
      const res = await this.addNews(params)
      if (res.ok) {
        this.$message.success('保存成功')
        await this.getNewsList()
        let setimageUrl = res.data[0].url
        this[SET_IMAGE_RELATE]({ setimageUrl })
        this.$router.push('/educationalProcess/newsManagement')
      }
    },
    async imgAdd(pos, fileObj) {
      const formdata = new FormData()
      formdata.append('file', fileObj)

      const res = await this.uploadFile(formdata)
      if (res.ok) {
        this.$refs.markdown.$img2Url(pos, res.data[0].url)
      } else {
        this.$refs.toolbar_left.$imgDelByFilename(pos)
      }
    },
    goBack() {
      let setimageUrl = ''
      this[SET_IMAGE_RELATE]({ setimageUrl })
      this.$router.go(-1)
    },
    imgDel() {},
  },
}
</script>
<style lang="scss" scoped>
.news-add {
  .essential-head-txt {
    margin-left: 35px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    position: relative;
    left: -22px;
    top: -61px;
  }
  .headImg {
    margin-left: 0px;
    margin-bottom: 15px;
    width: 150px;
    height: 150px;
    border: 1px #eee solid;
    display: inline-block;
    margin-right: 30px;
    overflow: hidden;

    img {
      width: 150px;
      height: 150px;
    }
  }
  .tips-message {
    color: #333333;
    ul > li:nth-child(2) {
      font-size: 12px;
      color: darkgray;
      margin-top: 5px;
    }
    ul > li:nth-child(3) {
      font-size: 12px;
      color: darkgray;
      margin-top: 5px;
    }
    position: relative;
    top: -70px;
    height: 10px;
    margin-left: 300px;
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
    font-size: 14px;
    color: #8c939d;
    width: 150px;
    height: 95px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .button-style {
    position: fixed;
    z-index: 9999;
    bottom: 100px;
    left: 1035px;
  }
}
</style>
