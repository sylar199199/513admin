<template>
  <el-breadcrumb class="base-breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="(item, key) in routerGetter"
      :key="key"
      :to="{ path: item.link }"
    >
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'base-breadcrumb',
  computed: {
    ...mapGetters('app', ['routerGetter']),
  },
}
</script>
<style lang="scss" scoped>
.base-breadcrumb {
}
</style>
