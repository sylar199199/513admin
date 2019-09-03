<template>
  <ul class="first-level">
    <li
      v-for="(item, key) in getFirstMenuGrade"
      :key="key"
      :class="{ active: current_path.indexOf(item.alias) === 1 }"
      @click="changeFirstLevelGrade(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>
<script>
//TODO:暂时先不考虑跳转到404 active转态问题，以及通过push方法跳转到其他路由改变active转态的问题，后期等待后端传递alias，可以在store中新开getter进行匹配
import { mapState, mapGetters, mapMutations } from 'vuex'
import { SET_FIRST_LEVEL_ACTIVE } from '@store/modules/app/mutation-types'
export default {
  name: 'first-level',
  data() {
    return {
      count: 0,
      current_path: '',
    }
  },
  computed: {
    ...mapGetters('app', ['getFirstMenuGrade']),
    ...mapState('app', {
      active_item: state => state.first_level_active,
    }),
    routerPath() {
      return this.$route.path
    },
  },
  watch: {
    // 因为页面刷新跳转两次，需要判断当第二次跳转的时候进行赋值
    routerPath(cur) {
      if (this.count === 1) return
      this.current_path = cur
      this[SET_FIRST_LEVEL_ACTIVE]({
        first_level_active: this.routerPath.split('/')[1],
      })
      this.count += 1
    },
    active_item(cur) {
      this.current_path = '/' + cur
    },
  },
  methods: {
    ...mapMutations('app', [SET_FIRST_LEVEL_ACTIVE]),
    changeFirstLevelGrade(menuInfo) {
      if (menuInfo.hasOwnProperty('link')) this.$router.push(menuInfo.link)
      this[SET_FIRST_LEVEL_ACTIVE]({ first_level_active: menuInfo.alias })
      // if (menuInfo.hasOwnProperty('link')) {
      //   this.$router.push(menuInfo.link)
      //   this[SET_FIRST_LEVEL_ACTIVE]({ first_level_active: menuInfo.alias })
      // } else {
      //   const nextToFirst = `${menuInfo.alias}`
      //   const nextToSecond = `${menuInfo.children[0].alias}`
      //   console.log('111', nextToFirst + '/' + nextToSecond)
      //   this.$router.push({
      //     path: nextToFirst + '/' + nextToSecond,
      //   })
      // }
    },
  },
}
</script>
<style lang="scss" scoped>
.first-level {
  height: 100%;
  margin-left: 107px;
  display: flex;
  align-items: center;
  > li {
    cursor: pointer;
    position: relative;
    height: 100%;
    font-size: 18px;
    padding: 0 25px;
    color: #ffffff;
    &.active {
      background-color: #2f333d;
      color: #58c6bd;
      &::after {
        content: '';
        width: 100%;
        height: 0;
        /*border-top: 3px solid $maincolor;*/ /*一级导航菜单下面蓝条去掉*/
        position: absolute;
        top: calc(100% - 3px);
        left: 0;
      }
    }
  }
}
</style>
