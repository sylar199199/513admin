<template>
  <div class="pagination-box">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  name: 'base-pagination',
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      required: true,
      validator(value) {
        return value > 0
      },
    },
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  computed: {
    query() {
      return this.$qs.parse(this.$route.query.search)
    },
  },
  watch: {
    query(cur) {
      this.currentPage = JSON.stringify(cur) === '{}' ? 1 : +cur.page
    },
  },
  created() {
    this.currentPage =
      (this.$route.query.search &&
        +this.$qs.parse(this.$route.query.search).page) ||
      1
  },
  methods: {
    handleCurrentChange(page) {
      const query = {
        search: this.$qs.stringify({
          ...this.query,
          page,
          size: this.pageSize,
        }),
      }
      this.currentPage = page
      this.$router.push({ query })
    },
  },
}
</script>
<style lang="scss" scoped>
.pagination-box {
  display: flex;
  justify-content: center;
  margin: 10px 0 0;
}
</style>
