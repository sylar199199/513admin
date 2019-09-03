<template>
  <div class="bulletin-edit">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="mini"
      :rules="rules"
    >
      <el-form-item label="通知类型" prop="type">
        <el-select
          disabled
          style="width:30%"
          v-model="form.msgType"
          placeholder="请选择通知类型"
        >
          <el-option
            v-for="(item, key) in optList"
            :key="key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="通知标题" prop="title">
        <el-input style="width: 30%" v-model="form.title" />
      </el-form-item>
      <el-form-item label="推送目标" prop="receiverList" v-if="notify">
        <el-select
          v-model="form.receiverList"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择推送目标"
          @visible-change="visibleChange"
          style="width: 20%"
        >
          <el-option
            v-for="(item, index) in notifyTypeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          v-show="isShow"
          style="margin-left: 35px"
          type="primary"
          @click="selectAll()"
        >
          全选
        </el-button>
        <el-button v-show="isShow" @click="clearAll()">
          清空
        </el-button>
      </el-form-item>
      <el-form-item label="接受对象" prop="notifyType" v-if="accept">
        <el-select
          v-model="form.receiverList"
          filterable
          allow-create
          default-first-option
          placeholder="请选择接受对象"
          @visible-change="visibleChange"
          style="width: 20%"
        >
          <el-option
            v-for="(item, index) in notifyTypeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接收对象" v-if="acceptRadio">
        <el-radio v-model="radio" label="3">
          全校人员
        </el-radio>
        <el-radio v-model="radio" label="4">
          全体教职工
        </el-radio>
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
import { mapActions } from 'vuex'
import { checkTitle } from '@utils/base-validators'

export default {
  name: 'bulletin-edit',
  components: {
    'c-markdown': mavonEditor,
  },
  data() {
    return {
      notify: false,
      accept: false,
      acceptRadio: false,
      radio: '',
      notifyTypeList: [],
      isShow: false,
      sign: '',
      form: {
        content: '',
        title: '',
        msgType: '',
        receiverList: null,
        acceptObject: '',
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
          label: '校内通知',
          value: '1',
        },
        {
          label: '课程通知',
          value: '2',
        },
        {
          label: '系统通知',
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
      'getDownSchool',
      'selectCourseDrop',
      'addMessage',
      'getAllBulletin',
      'getcourseBulletin',
      'getschoolBulletin',
    ]),
    ...mapActions('app', ['uploadFile']),
    async handleSubmit() {
      let params = this.form
      delete params.acceptObject
      if (this.form.msgType === '2') {
        params.receiverList = [this.form.receiverList]
      }
      if (this.form.msgType === '1') {
        params.receiverList = ['1']
        params.notifyType = this.radio
      }
      let res = await this.addMessage(params)
      if (res.ok) {
        this.$message.success('添加成功')
        this.$router.go(-1)
        if (this.form.msgType === '1') {
          this.getschoolBulletin()
        }
        if (this.form.msgType === '2') {
          this.getcourseBulletin()
        }
        if (this.form.msgType === '3') {
          this.getAllBulletin()
        }
      } else {
        this.$message.error('新增失败！')
      }
    },
    imgDel() {},
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
    visibleChange(callback) {
      this.isShow = callback
    },
    selectAll() {
      if (this.form.msgType === '3') {
        this.selectSystemAll()
      } else if (this.form.msgType === '1') {
        this.selectSchoolAll()
      } else {
        this.form.notifyType = '5'
        this.form.receiverList = []
      }
    },
    clearAll() {
      if (this.form.msgType === '3') {
        this.clearSystemAll()
      } else if (this.form.msgType === '1') {
        this.clearSchoolAll()
      } else {
        this.form.notifyType = '5'
        this.form.receiverList = []
      }
    },
    selectSystemAll() {
      this.form.receiverList = ['全体']
      this.form.notifyType = '1'
    },
    clearSystemAll() {
      this.form.receiverList = []
      this.form.notifyType = '2'
    },
    selectSchoolAll() {
      this.form.receiverList = ['全体']
      this.form.notifyType = '3'
    },
    clearSchoolAll() {
      this.form.notifyType = '4'
      this.form.receiverList = []
    },
    goBack() {
      this.$router.go(-1)
    },
    async getSchoolList() {
      const res = await this.getDownSchool()
      const types = Object.keys(res.data).map(key => {
        return {
          label: res.data[key].schoolName,
          value: res.data[key].sign,
        }
      })
      this.notifyTypeList = types
    },
    async getCourseList() {
      const res = await this.selectCourseDrop()
      const types = Object.keys(res.data).map(key => {
        return {
          label: res.data[key].courseName,
          value: res.data[key].sign,
        }
      })
      this.notifyTypeList = types
    },
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
  async mounted() {
    this.form.msgType = this.$route.query.msgType
    if (this.form.msgType === '3') {
      this.notify = true
      this.acceptRadio = false
      this.accept = false
      this.getSchoolList()
      this.form.notifyType = '2'
    }
    if (this.form.msgType === '1') {
      this.notify = false
      this.acceptRadio = true
      this.accept = false
      this.form.notifyType = ''
    }
    if (this.form.msgType === '2') {
      this.notify = false
      this.acceptRadio = false
      this.accept = true
      this.getCourseList()
      this.form.notifyType = '5'
    }
  },
}
</script>
<style lang="scss" scoped>
.bulletin-edit {
  .button-style {
    position: fixed;
    z-index: 9999;
    bottom: 50px;
    left: 1035px;
  }
}
</style>
