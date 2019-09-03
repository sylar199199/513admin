<template>
  <div class="bulletin-edit">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="mini"
      :rules="rules"
    >
      <el-form-item label="操作">
        <el-button type="primary" size="mini" @click="handleSubmit">
          保存
        </el-button>
      </el-form-item>
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="公告类型" prop="type">
        <el-select
          style="width:100%"
          v-model="form.type"
          placeholder="请选择活动区域"
        >
          <el-option
            v-for="(item, key) in optList"
            :key="key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="公告排序">
        <el-input v-model.number="form.sort" />
      </el-form-item>
      <el-form-item label="通知内容">
        <c-markdown
          ref="markdown"
          :toolbars="toolbars"
          v-model="form.content"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import toolbars from '@configs/markdown-config'
import { mapActions } from 'vuex'
import { checkTitle } from '@utils/base-validators'

export default {
  name: 'bulletin-edit',
  components: {
    'c-markdown': mavonEditor,
  },
  data() {
    return {
      sign: '',
      form: {
        content: '',
        title: '',
        type: '1',
        sort: 1,
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { validator: checkTitle, trigger: 'blur' },
        ],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
      optList: [
        {
          label: 'PC',
          value: '1',
        },
        {
          label: 'App',
          value: '2',
        },
        {
          label: 'PC和APP',
          value: '3',
        },
      ],
      toolbars,
    }
  },
  methods: {
    ...mapActions('announcements', [
      'getBulletinById',
      'addBulletin',
      'updateBulletin',
    ]),
    ...mapActions('app', ['uploadFile']),
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const data = (this.sign === '' && this.form) || {
            ...this.form,
            sign: this.sign,
          }
          const res = await this[
            this.sign === '' ? 'addBulletin' : 'updateBulletin'
          ]({
            ...data,
            sort: data.sort + '',
          })
          if (res.ok) {
            this.$message.success('新增成功！')
            this.$router.push('/educationalProcess/announcements')
          } else {
            this.$message.error('新增失败！')
          }
        }
      })
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
    imgDel(pos) {},
  },
  async created() {
    if (this.$route.query.sign) {
      const res = await this.getBulletinById(this.$route.query.sign)
      if (res.ok) {
        const { content, title, type, sort, sign } = res.data
        this.form = { content, title, type: type, sort }
        this.sign = sign
      } else {
        this.$router.replace({ path: '/educationalProcess/announcements' })
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.bulletin-edit {
}
</style>
