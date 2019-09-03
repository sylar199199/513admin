<template>
  <div>
    <div class="tool-box clearfix">
      <el-form :inline="true">
        <el-form-item label="课程标题">
          <el-input
            style="margin-left: 10px"
            size="mini"
            v-model="title"
            placeholder="请输入课程标题"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="mini"
            type="primary"
            class="search-button"
            style="margin-left: 20px"
            @click="searchNotify"
          >
            搜索
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <c-table />
    <c-notify-modal />
  </div>
</template>
<script>
import CTable from '@components/views/educational-process/my-notify/c-table'
import CNotifyModal from '@components/views/educational-process/my-notify/c-modal/c-manager-modal'
import { mapActions } from 'vuex'
import { searchCondition } from '@mixins/locality'

export default {
  name: 'my-course',
  components: {
    'c-table': CTable,
    'c-notify-modal': CNotifyModal,
  },
  mixins: [searchCondition],
  data() {
    return {
      title: '',
    }
  },
  methods: {
    ...mapActions('announcements', {
      handleGetDataByCondition: 'getMyNotifyList',
    }),
    ...mapActions('announcements', ['getMyNotifyList']),
    async searchNotify() {
      const title = this.title
      await this.getMyNotifyList(title)
    },
  },
}
</script>
<style lang="scss" scoped>
.introduction-course {
  .search-box {
    width: 200px;
  }
}
</style>
