<template>
  <div>
    <template v-if="item.children">
      <el-submenu :index="item.alias">
        <template slot="title">
          <i class="el-icon-menu" />
          {{ item.name }}
        </template>
        <template v-for="(child, _key) in item.children">
          <sidebar-item
            v-if="child.children && child.children.length > 0"
            :item="child"
            :key="_key"
          />
          <el-menu-item v-else :key="_key" :index="child.alias">
            <router-link class="router-link" :to="{ name: item.alias }">
              {{ child.name }}
            </router-link>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item :index="item.alias">
        <router-link class="router-link" :to="{ name: item.alias }">
          <i class="el-icon-menu" />
          {{ item.name }}
        </router-link>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.router-link {
  display: block;
  height: 100%;
  color: #999999 !important;
}
.el-menu-item.is-active {
  a {
    color: $maincolor !important;
  }
}
</style>
