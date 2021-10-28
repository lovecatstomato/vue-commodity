<template>
  <el-tabs>
    <el-tab-pane label="商品列表">
      <el-table :data="table" border style="width: 100%">
        <el-table-column
          prop="productCode"
          label="产品编号"
          width="180"
        ></el-table-column>
        <el-table-column prop="categoryId" label="分类编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="产品名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="销售价"> </el-table-column>
        <el-table-column prop="unitName" label="数量单位"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="shows(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteUser(scope.row.account)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currPage"
      >
      </el-pagination>
      <el-form v-show="updShow"> </el-form>
    </el-tab-pane>

    <!-- 添加商品列表 -->
    <el-tab-pane label="添加商品">
      <el-form label-width="80px" style="width: 600px" v-model="add_table">
        <el-form-item label="用户账号">
          <el-input v-model="add_table.name" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      updShow: false,
      total: 0, // 分页的数据总数量
      currPage: 1,
      table: [], // 请求产品数据的数组
      add_table: [], // 添加数据的数组
    };
  },
  created() {
    this.commoList();
  },
  methods: {
    commoList(page = 1) {
      this.$axios.get("/main/sell/product/show?page=" + page).then((result) => {
        this.table = result.list;
        this.total = result.total;
        this.currPage = result.pageNum;
      });
    },
  },
};
</script>