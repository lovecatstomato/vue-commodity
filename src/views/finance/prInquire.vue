<template>
  <div>
    <el-table :data="lists" style="width: 100%">
      <el-table-column prop="type" label="收支类型" width="180"> </el-table-column>
      <el-table-column prop="no" label="产品名称" width="180"> </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="currPage"
      @current-change="pageChange"
    >
    </el-pagination>
    <el-form v-show="updShow"> </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updShow: false,
      lists: [],
      total: 0, // 分页的数据总数量
      currPage: 1,
    };
  },
  created() {
    this.que();
  },

  methods: {
    // 请求分页数据
    pageChange(currPage) {
      this.que(currPage);
    },
    que(page = 1) {
      this.$axios.get("/main/finance/query?page=" + page).then((res) => {
          console.log(res);
        this.lists = res.list;
        this.total = res.total;
        this.currPage = res.pageNum;
        console.log(this.lists);
      });
    },
  },
};
</script>