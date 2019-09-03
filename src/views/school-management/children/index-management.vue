<template>
  <div class="index-management">
    <div class="index-mini">
      <div class="header">
        <div class="img-box">
          <img :src="form.logo" />
        </div>
      </div>
      <div class="content">
        <img :src="form.backgroundImage" />
      </div>
    </div>
    <div class="form-content">
      <c-form
        :form="form"
        @handle-change="handleChange"
        @handle-post="handlePost"
      />
    </div>
  </div>
</template>
<script>
import CForm from '@components/views/school-management/index-management/c-form'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'index-management',
  components: {
    'c-form': CForm,
  },
  data() {
    return {
      form: {
        logo: '',
        backgroundImage: '',
        title: '',
      },
      sign: '',
    }
  },
  computed: {
    ...mapState('index-management', {
      indexViewData: state => state.indexViewData,
    }),
  },
  methods: {
    ...mapActions('index-management', [
      'getIndexView',
      'updateIndex',
      'addDateIndex',
    ]),
    handleChange({ prop, url }) {
      if (url.indexOf('@!blank_rule') != -1) {
        this.form[prop] =
          url.substring(0, url.indexOf('blank_rule')) + 'none_rule'
      } else {
        this.form[prop] = url
      }
    },
    async handlePost(data) {
      if (this.sign !== '') {
        if (
          await this.updateIndex({
            ...data,
            sign: this.sign,
          })
        ) {
          this.$message.success('上传成功')
          this.init()
        }
      } else {
        if (
          await this.addDateIndex({
            ...data,
          })
        ) {
          this.$message.success('上传成功')
          this.init()
        }
      }
    },
    async init() {
      const res = await this.getIndexView()
      if (res.data !== null) {
        this.sign = res.data.sign
        if (res.ok) {
          Object.keys(this.form).map(key => {
            this.form[key] = res.data[key]
          })
        }
      }
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss" scoped>
.index-management {
  > div {
    display: inline-block;
  }
  .index-mini {
    border: 1px solid #cccccc;
    width: 600px;
    .img-box {
      width: 115px;
      height: 100%;
      margin-left: 20px;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .header {
      height: 50px;
      border-bottom: 1px solid #cccccc;
      background-color: #7d7d7d;
    }
    .content {
      height: 420px;
    }
  }
  .form-content {
    float: right;
    width: calc(100% - 600px);
    padding-left: 20px;
  }
}
</style>
