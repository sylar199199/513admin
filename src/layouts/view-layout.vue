<template>
  <div>
    <base-header v-if="isLogin" />
    <base-layout>
      <router-view class="router-view" />
    </base-layout>
  </div>
</template>
<script>
import BaseHeader from '@components/base/base-header'
import BaseLayout from '@components/base/base-layout'
import { mapState } from 'vuex'

export default {
  name: 'view-layout',
  components: {
    'base-header': BaseHeader,
    'base-layout': BaseLayout,
  },
  computed: {
    ...mapState('auth', {
      isLogin: state => state.isLogin,
    }),
  },
}
</script>
<style lang="scss" scoped>
.router-view {
  background-color: #ffffff;
  padding: 5px;
}
</style>
