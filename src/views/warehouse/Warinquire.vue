<template>
  <div>
    <el-table :data="lists" style="width: 100%">
      <el-table-column prop="productCode" label="产品编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="产品名称" width="180"> </el-table-column>
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
      console.log(currPage);
      this.que(currPage);
    },
    que(page = 1) {
      this.$axios.get("/main/stock/query?page=" + page).then((res) => {
        this.lists = res.list;
        this.total = res.total;
        this.currPage = res.pageNum;
        console.log(this.lists);
      });
    },
  },
};
</script>