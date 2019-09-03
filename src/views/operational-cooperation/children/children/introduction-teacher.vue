<template>
  <div>
    <div class="tool-box clearfix">
      <el-form>
        <el-form-item>
          <el-button
            size="mini"
            type="primary"
            @click="setModalRelate({ isShow: true, key: 'addOrEdit' })"
          >
            新增关联
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <c-table :now-page="page" />
    <c-introduction-modal :now-page="page" />
    <div class="pagination-box">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total.total"
        :page-size="10"
        :page-sizes="[10, 20]"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import CTable from '@components/views/operational-cooperation/introduction-course/introduction-teacher/c-table'
import CIntroductionModal from '@components/views/operational-cooperation/introduction-course/introduction-teacher/c-modal'
import { mapActions, mapMutations, mapState } from 'vuex'
import { SET_MODAL_TEACHER } from '@store/modules/introduction-course/mutation-types'
export default {
  name: 'introduction-teacher',
  data() {
    return {
      page: 1,
      size: 10,
    }
  },
  components: {
    'c-table': CTable,
    'c-introduction-modal': CIntroductionModal,
  },
  computed: {
    ...mapState('introduction-course', {
      total: state => {
        console.log('state', state)
        return state
      },
    }),
  },
  methods: {
    ...mapActions('introduction-course', ['getAllIntroduceTeacherList']),
    ...mapMutations('introduction-course', {
      setModalRelate: SET_MODAL_TEACHER,
    }),
    async handleCurrentChange(val) {
      const params = {
        page: val,
        size: this.size,
        courseIdSign: this.$route.query.id,
      }
      await this.getAllIntroduceTeacherList(params)
    },
  },
}
</script>

<style scoped lang="scss">
.pagination-box {
  display: flex;
  justify-content: center;
  margin: 10px 0 0;
}
</style>
