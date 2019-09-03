<template>
  <el-form
    :inline="formConfigs.lineStyle"
    :model="form"
    :label-position="formConfigs.labelPosition || 'left'"
    :label-width="formConfigs.labelWidth"
    :rules="rules"
    :size="formConfigs.size"
    :style="formConfigs.style"
    ref="form"
  >
    <slot name="formItem" />
    <el-form-item
      v-for="(item, key) in formConfigs.formItemList"
      :key="key"
      :label="item.label"
      :prop="item.prop"
      :style="item.itemStyle"
    >
      <el-input
        v-if="item.type == 'input'"
        v-model="form[item.prop]"
        :style="item.style"
        :clearable="item.clearable"
        :disabled="item.disabled"
        :prefix-icon="item.prefixIcon"
        :show-password="item.isPassword || false"
        :placeholder="item.placeholder"
      >
        <i
          v-if="item.prefix"
          slot="prefix"
          :class="item.prefix.class"
          :style="item.prefix.iStyle"
        >
          <img
            v-show="item.prefix.imgSrc"
            :src="item.prefix.imgSrc"
            :style="item.prefix.imgStyle"
          />
        </i>
        <i
          v-if="item.suffix"
          :class="item.suffix.class"
          :style="item.suffix.iStyle"
          slot="suffix"
          @click="item.suffix.handleClcik"
        >
          <img
            v-show="item.suffix.imgSrc"
            :style="item.suffix.imgStyle"
            :src="item.suffix.imgSrc"
            @load="item.suffix.handleLoad"
            @error="item.suffix.handleError"
          />
        </i>
      </el-input>
      <el-input
        v-else-if="item.type == 'textarea'"
        type="textarea"
        v-model="form[item.prop]"
        :style="item.style"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
      />
      <el-select
        :clearable="item.clearable"
        v-else-if="item.type == 'select'"
        v-model="form[item.prop]"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
        :style="item.style"
      >
        <i
          v-if="item.prefix"
          slot="prefix"
          :class="item.prefix.class"
          :style="item.prefix.iStyle"
        >
          <img
            v-show="item.prefix.imgSrc"
            :src="item.prefix.imgSrc"
            :style="item.prefix.imgStyle"
          />
        </i>
        <el-option
          v-for="(optItem, _key) in item.optList"
          :key="_key"
          :label="optItem[item.labelKey] || optItem.label"
          :value="optItem[item.valueKey] || optItem.value"
          :disabled="optItem[item.disabled] || optItem.disabled"
          :style="item.style"
        />
      </el-select>
      <el-cascader
        v-else-if="item.type === 'cascader'"
        v-model="form[item.prop]"
        :options="item.optList"
        :props="item.propsSetting"
        clearable
      />
      <el-date-picker
        :value-format="item.dateFormate"
        v-else-if="item.type === 'single-datepicker'"
        v-model="form[item.prop]"
        :type="item.type"
        :disabled="item.disabled"
        :clearable="true"
        :placeholder="item.label"
        :style="item.style"
      />
      <el-radio
        v-else-if="item.type == 'radio'"
        v-model="form[item.prop]"
        :style="item.style"
        :label="item.key"
        border
        size="small"
      />
      <el-date-picker
        v-else
        v-model="form[item.prop]"
        type="daterange"
        range-separator="-"
        :start-placeholder="item.startPlaceholder"
        :end-placeholder="item.endPlaceholder"
        :picker-options="item.pickerOpt || {}"
      />
    </el-form-item>
    <div
      class="searchBtn"
      v-if="formConfigs.operate"
      :style="formConfigs.operate.btnAreaStyle"
    >
      <el-button-group :style="formConfigs.operate.groupStyle">
        <el-button
          v-for="(item, key) in formConfigs.operate.buttonList"
          :key="key"
          :size="item.size"
          :type="item.type"
          :icon="item.icon"
          @click="item.handleClick"
          :style="item.style"
        >
          {{ item.name }}
        </el-button>
      </el-button-group>
      <slot name="operate" />
    </div>
  </el-form>
</template>
<script>
export default {
  name: 'base-form',
  props: {
    formConfigs: {
      type: Object,
      required: true,
      default: () => {},
    },
    formData: {
      type: Object,
      required: true,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {},
    }
  },
  computed: {
    _formData() {
      return this.formData
    },
  },
  watch: {
    // 当再次传入formdata触发
    _formData(value) {
      this.form = {
        ...value,
      }
    },
  },
  methods: {
    // 初始化设置config存在的default值
    setDefaultValue(hasReset = false) {
      const formData = { ...this.formData }
      // 设置默认值
      this.formConfigs.formItemList.forEach(item => {
        // formData 没有设置值 以及 config存在默认值
        if (
          item.hasOwnProperty('default') && // 有默认值
          this.formData.hasOwnProperty(item.prop) && // formData存在该项
          this.formData[item.prop] === '' && // form对应项值为'' boolean object array number 都不做考虑
          hasReset
        ) {
          formData[item.prop] = item.default
        }
      })
      // 初始化form
      this.form = formData
    },
    // validate
    validate(cb = null) {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (typeof cb === 'function') cb(this.form)
        } else {
          return false
        }
      })
    },
    // reset form value
    reset(callback = null) {
      this.$refs.form.resetFields()
      this.setDefaultValue(true)
      if (typeof callback === 'function') callback()
    },
  },
  mounted() {
    this.setDefaultValue(true)
  },
}
</script>
