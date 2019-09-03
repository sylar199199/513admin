<template>
  <el-menu
    :default-openeds="[]"
    :default-active="$route.name"
    :unique-opened="true"
    ref="menu"
  >
    <sub-menu-item v-for="(item, key) in menuList" :key="key" :item="item" />
  </el-menu>
</template>
<script>
import SubMenuItem from '@components/base/base-menu/submenu-item'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'second-level',
  components: {
    'sub-menu-item': SubMenuItem,
  },
  data() {
    return {
      menuList: [],
    }
  },
  computed: {
    ...mapGetters('app', ['getSecondMenuGrade']),
    ...mapState('app', {
      first_level_active: state => state.first_level_active,
    }),
    currentRouteName() {
      return this.$route.name
    },
  },
  watch: {
    getSecondMenuGrade: {
      handler(cur) {
        if (cur.length) {
          this.menuList = cur
        }
      },
      immediate: true,
    },
    first_level_active(cur) {
      // 解决切换一级标题，二级标题activeIndex切换错误的问题
      if (this.$refs.menu) {
        this.$nextTick(() => {
          this.$refs.menu.activeIndex = this.$route.name
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
