<template>
  <div class="base-header">
    <router-link to="/home">
      <img class="logo" :src="logo" />
    </router-link>
    <first-level />
    <base-setting class="flex-right" />
  </div>
</template>
<script>
import logo from '@assets/images/nav_logo2x.png'
import { FirstLevel } from '@components/base/base-menu'
import BaseSetting from '@components/base/base-setting'

export default {
  name: 'base-header',
  components: {
    'first-level': FirstLevel,
    'base-setting': BaseSetting,
  },
  data() {
    return {
      logo,
    }
  },
}
</script>
<style lang="scss" scoped>
.base-header {
  height: 88px;
  line-height: 88px;
  background-color: #464c5b;
  display: flex;
  align-items: center;
  padding: 0 13px 0 41px;
  .logo {
    vertical-align: middle;
  }
}
.flex-right {
  margin: auto;
  margin-right: 0;
}
</style>
