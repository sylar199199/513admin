<template>
  <div class="c-condition-query">
    <div class="header">
      <slot class="slot" />
      <c-search
        :search-placeholder="formConfigs.searchPlaceholder"
        @handle-action="handleAction"
        ref="searchRef"
      />
    </div>
    <transition name="fade">
      <div class="form-search-area" v-show="isFold">
        <base-form
          :form-configs="formConfigs"
          :form-data="formData"
          ref="form"
        />
      </div>
    </transition>
  </div>
</template>
<script>
import CSearch from '@components/global/c-condition-query/c-search'
import BaseForm from '@components/base/base-form'

export default {
  name: 'c-condition-query',
  components: {
    'c-search': CSearch,
    'base-form': BaseForm,
  },
  props: {
    formConfigs: {
      type: Object,
      default: () => {},
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isFold: false,
    }
  },
  methods: {
    handleAction({ methods, isFold = false }) {
      switch (methods) {
        case 'reset':
          // 重置form以及query
          this.$refs.form.reset()
          this.$router.push({
            query: {},
          })
          break
        case 'search':
          this.search()
          break
        default:
          // fold关闭 清空form
          if (!isFold) {
            this.$refs.form.reset(() => {
              this.isFold = isFold
            })
          } else {
            this.isFold = isFold
          }
          break
      }
    },
    search() {
      const searchFormMeta = {}
      searchFormMeta[
        this.formConfigs.searchPropName
      ] = this.$refs.searchRef.value
      // isFold为true 并且 form挂载
      if (this.isFold && this.$refs.form) {
        this.$refs.form.validate(data => {
          this.$emit('handle-search', {
            ...data,
            searchFormMeta,
          })
        })
      } else {
        this.$router.push({
          query: { search: this.$qs.stringify(searchFormMeta) },
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.c-condition-query {
  padding: 20px;
  box-shadow: 0 0 2px #999999;
  margin-bottom: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .form-search-area {
    margin-top: 40px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
