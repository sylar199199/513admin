<template>
  <c-nest-layout parent-router-name="schoolNotify">
    <template v-slot:nest>
      <div class="tool-box clearfix">
        <el-form :inline="true">
          <el-form-item label="通知类型">
            <el-select
              disabled
              size="mini"
              v-model="value"
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
          <el-form-item label="状态">
            <el-select
              style="margin-left: 10px"
              size="mini"
              v-model="status"
              placeholder="请选择状态"
              @change="selectChange"
            >
              <el-option
                v-for="(item, key) in optList2"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="add">
              新增
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <c-table :now-status="value" />
    </template>
    <template v-slot:child>
      <router-view />
    </template>
  </c-nest-layout>
</template>
<script>
import CTable from '@components/views/educational-process/announcements/c-table'
import { mapActions } from 'vuex'
import { searchCondition } from '@mixins/locality'
export default {
  name: 'home',
  components: {
    'c-table': CTable,
  },
  mixins: [searchCondition],
  data() {
    return {
      value: '1',
      status: '0',
      optList: [
        {
          label: '校内公告 ',
          value: '1',
        },
      ],
      optList2: [
        {
          label: '全部',
          value: '0',
        },
        {
          label: '启用',
          value: '1',
        },
        {
          label: '禁用',
          value: '2',
        },
      ],
    }
  },
  methods: {
    ...mapActions('announcements', {
      handleGetDataByCondition: 'getschoolBulletin',
    }),
    selectChange(val) {
      this.handleGetDataByCondition({ status: val })
    },
    add() {
      this.$router.push({
        path: '/educationalProcess/schoolNotify/addBulletin',
        query: {
          msgType: this.value,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.tool-box {
  margin-bottom: 20px;
  .add-button {
    margin-left: 15px;
  }
}
</style>
