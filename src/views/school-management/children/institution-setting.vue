<template>
  <div class="institution-setting">
    <el-button
      class="add-button"
      size="small"
      type="primary"
      @click="addFirstLevelDepartment"
    >
      新增一级部门
    </el-button>
    <el-tree
      node-key="sign"
      :data="departmentList"
      :props="defaultProps"
      default-expand-all
    >
      <span class="custom-tree-node" slot-scope="{ node }">
        <span>{{ node.data.label }}</span>
        <div>
          <span class="button-group">
            <el-button
              type="text"
              size="mini"
              icon="el-icon-plus"
              @click.stop="() => action(node, 'add')"
              v-if="node.level < 3"
            >
              新增
            </el-button>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-edit"
              @click.stop="() => action(node, 'edit')"
            >
              编辑
            </el-button>
            <el-button
              v-if="node.data.count === '0'"
              type="text"
              size="mini"
              icon="el-icon-minus"
              @click.stop="() => action(node, 'delete')"
            >
              删除
            </el-button>
          </span>
          <span class="member">
            <span class="member-counts">成员 {{ node.data.count }}</span>
          </span>
          <span class="time">
            {{ node.data.createTime }}
          </span>
        </div>
      </span>
    </el-tree>
    <c-modal
      :show="show"
      :modal-type="modalType"
      :current-form-data="currentParentData"
      @handle-change="show = false"
      @handle-reload="getDepartmentTree"
    />
  </div>
</template>
<script>
import CModal from '@components/views/school-management/institution-setting/c-modal'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'institution-setting',
  components: {
    'c-modal': CModal,
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      show: false,
      modalType: 'add',
      currentParentData: {
        sign: '',
        departmentName: '',
      },
    }
  },
  computed: {
    ...mapState('institution-setting', {
      departmentList: state => state.departmentList,
    }),
  },
  methods: {
    ...mapActions('institution-setting', [
      'getDepartmentTree',
      'deleteDepartment',
      'getChildDepartmentList',
    ]),
    action({ data, level }, methods = 'add') {
      if (methods === 'delete') {
        this.delete(data)
      } else {
        const { sign, label } = data
        this.currentParentData = {
          sign,
          departmentName: label,
        }
        this.show = true
        this.modalType = methods
      }
    },
    delete(data) {
      this.$confirm(`确认删除机构：${data.label}？`)
        .then(async _ => {
          await this.deleteDepartment({
            sign: data.sign,
          })
          // 重新获取
          this.$nextTick(() => {
            this.getDepartmentTree()
          })
          done()
        })
        .catch(_ => {})
    },
    // 添加一级部门
    addFirstLevelDepartment() {
      this.currentParentData = { sign: '' }
      this.show = true
      this.modalType = 'add'
    },
  },
  mounted() {
    this.getDepartmentTree()
  },
}
</script>
<style lang="scss" scoped>
.add-button {
  margin-bottom: 15px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;

  .button-group {
    margin-right: 60px;
  }
  .member {
    margin-right: 30px;
    font-size: 12px;
  }
  .time {
    font-size: 12px;
    color: #333333;
  }
}
</style>
