<template>
  <div class="authority-creator">
    <p class="header">
      <span class="left" v-if="!isDefault" @click="handleRole('tree')">
        <i class="el-icon-setting" />
        配置权限
      </span>
      <span class="right" v-if="!isDefault" @click="handleRole('role')">
        <i class="el-icon-setting" />
        编辑
      </span>
    </p>
    <div class="content">
      <div class="authority-avatar">
        <img src="" alt="" />
      </div>
      <p class="authority-name">
        {{ isDefault ? '自定义' : roleInfo.name }}
      </p>
      <div class="authority-desc">
        {{
          isDefault
            ? '配置自定义角色，并在该角色下配置员工账号，灵活管理平台权限'
            : roleInfo.description
        }}
      </div>
      <div class="role-action-content">
        <div class="role-account-counts-box">
          <p class="role-account-counts" v-if="!isDefault">
            该角色已配置
            <i>
              {{ roleInfo.count }}
            </i>
            个账号
          </p>
        </div>
        <el-button
          class="account-management-button"
          :type="isDefault ? 'primary' : 'default'"
          @click="handleRole(isDefault ? 'role' : 'accountManage')"
        >
          {{ isDefault ? '新增角色' : '管理账号' }}
        </el-button>
        <p class="created_at" v-if="!isDefault">
          创建于{{ roleInfo.createTime }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AuthorityCreator',
  props: {
    roleInfo: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: NaN,
    },
  },
  computed: {
    isDefault() {
      return !this.roleInfo
    },
  },
  methods: {
    handleRole(type) {
      this.$emit('handleRole', {
        type,
        data: {
          ...this.roleInfo,
          index: this.index,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.authority-creator {
  text-align: center;
  height: 300px;
  margin-top: 20px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  box-shadow: 0 0 5px #cccccc;
  padding: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px #999999;
  }
  .header {
    width: 100%;
    height: 14px;
  }
  .content {
    padding: 15px 0;
    .authority-avatar {
      margin: 0 auto;
      width: 75px;
      height: 75px;
      background-color: $maincolor;
      border-radius: 50%;
      border: 1px solid #cccccc;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .authority-name {
      padding: 15px 0;
    }
    .authority-desc {
      height: 28px;
      line-height: 14px;
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .role-action-content {
      padding: 20px 0 10px;
      font-size: 12px;
      color: #999999;
      .role-account-counts-box {
        height: 13px;
        .role-account-counts {
          i {
            color: #f00;
          }
        }
      }
      .account-management-button {
        margin: 10px 0;
      }
    }
  }
}
</style>
