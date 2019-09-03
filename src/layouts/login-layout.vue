<template>
  <div class="wrapper" id="wrapper">
    <div class="logoImg" />
    <router-view />
    <p class="copyight">
      Copyright ©深圳市伍壹叁教育科技有限公司 版权所有 粤ICP备19058570号
    </p>
  </div>
</template>

<script>
export default {
  name: 'login-layout',
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url('../assets/svg/gen.svg');
  background-size: 100%;
  .logoImg {
    height: 80px;
    margin: 40px 0 0 50px;
    width: 500px;
    background: url('../assets/images/logoX2.png') no-repeat;
    background-size: 50%;
  }
  .copyight {
    color: #ffffff;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
