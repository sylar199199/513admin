<template>
  <el-container class="base-container">
    <!-- side -->
    <el-aside width="200px" style="background-color: #F5F5F5">
      <base-user-info />
      <second-level />
    </el-aside>
    <!-- container -->
    <el-container>
      <!-- header -->
      <el-header class="layout-header">
        <base-breadcrumb />
        <c-mydetail-modal />
        <c-edit-password-model />
      </el-header>
      <!-- content -->
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import SecondLevel from '@components/base/base-menu/second-level'
import BaseUserInfo from '@components/base/base-user-info'
import BaseBreadcrumb from '@components/base/base-breadcrumb'
import CMyDetailModal from '@components/base/base-details'
import CEditPasswordModel from '@components/base/base-edit-password'

export default {
  name: 'base-layout',
  components: {
    'second-level': SecondLevel,
    'base-user-info': BaseUserInfo,
    'base-breadcrumb': BaseBreadcrumb,
    'c-mydetail-modal': CMyDetailModal,
    'c-edit-password-model': CEditPasswordModel,
  },
}
</script>
<style lang="scss" scoped></style>
