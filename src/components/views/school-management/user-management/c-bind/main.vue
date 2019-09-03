<template>
  <div class="c-bind">
    <p class="title">
      {{ roleNameMatch }}
    </p>
    <el-row class="item" v-for="(item, name) in config" :key="name">
      <el-col :span="4"> {{ item }}: </el-col>
      <el-col :span="20">
        {{ roleInfo[name] }}
      </el-col>
    </el-row>
    <el-button class="btn" type="primary" size="big" @click="unbind">
      解除绑定
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'c-bind',
  props: {
    roleInfo: {
      type: Object,
      default: () => {},
    },
    roleNameMatch: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    unbind() {
      this.$emit('handle-unbind', this.roleInfo.sign)
    },
  },
}
</script>
<style lang="scss" scoped>
.c-bind {
  margin: 0 auto;
  width: 300px;
  height: 350px;
  padding: 15px 30px;
  color: #ffffff;
  position: relative;
  background-color: #384663;
  border-radius: 5px;
  .title {
    text-align: center;
  }
  .item {
    padding: 10px;
    font-size: 14px;
  }
  .btn {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
