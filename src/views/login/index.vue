<template>
  <c-content class="login-content">
    <sign />
  </c-content>
</template>

<script>
import Sign from '@components/sign'

export default {
  name: 'login',
  components: {
    sign: Sign,
  },
}
</script>
<style lang="scss" scoped>
.login-content {
  width: 368px;
  position: absolute;
  background-color: #ffffff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #cccc;
  border-radius: 3px;
}
</style>
