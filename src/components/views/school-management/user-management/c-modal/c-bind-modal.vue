<template>
  <el-dialog
    title="绑定信息"
    :visible.sync="dialogVisible"
    @close="cancel"
    top="5vh"
  >
    <div class="content">
      <el-row>
        <el-col
          v-for="(item, key) in userRoleInfo"
          :key="key"
          :span="24 / userRoleInfo.length"
        >
          <c-bind
            :role-info="item"
            :role-name-match="roleNameMatch[item.roleKey]"
            :config="bindConfig[item.roleKey]"
            @handle-unbind="unbind"
          />
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ok">
        确 定
      </el-button>
      <el-button @click="cancel">
        取 消
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import CBind from '@components/views/school-management/user-management/c-bind'
import { mapState, mapMutations, mapActions } from 'vuex'
import { SET_MODAL_SHOW } from '@store/modules/user-management/mutation-types'
import {
  roleNameMatch,
  bindConfig,
} from '@components/views/school-management/user-management/c-bind/role-config'

export default {
  name: 'c-bind-modal',
  components: {
    'c-bind': CBind,
  },
  data() {
    return {
      dialogVisible: false,
      roleNameMatch,
      bindConfig,
    }
  },
  computed: {
    ...mapState('user-management', {
      isShow: state => state.show.bind,
      userRoleInfo: state => state.userRoleInfo,
    }),
  },
  watch: {
    isShow(cur) {
      this.dialogVisible = cur
    },
  },
  methods: {
    ...mapActions('user-management', ['unbindUserRole', 'getAllUsersList']),
    ...mapMutations('user-management', [SET_MODAL_SHOW]),
    ok() {
      this[SET_MODAL_SHOW]({ methods: 'bind', isShow: false })
    },
    cancel() {
      this[SET_MODAL_SHOW]({ methods: 'bind', isShow: false })
    },
    unbind(sign) {
      this.unbindUserRole(sign)
    },
  },
}
</script>
<style lang="scss" scoped>
.content {
}
</style>
