<template>
  <div class="c-content">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'c-content',
}
</script>
<style lang="scss" scoped>
.c-content {
  margin-bottom: 10px;
  padding: 30px;
  padding-bottom: 20px;
  border: 1px solid #eee;
  background: #fff;
}
</style>
