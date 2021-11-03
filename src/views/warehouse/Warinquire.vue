<template>
  <div>
    <!-- 查询窗口 -->
    <el-form :inline="true" :model="formInline">
      <el-form-item label="产品编号">
        <el-input v-model="formInline.productCode " placeholder="产品编号"></el-input>
      </el-form-item>
      <el-form-item label="产品名称">
        <el-input
          v-model="formInline.name"
          placeholder="产品名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="que">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 显示 -->
    <el-table :data="lists" style="width: 100%">
      <el-table-column prop="productCode" label="产品编号"> </el-table-column>
      <el-table-column prop="name" label="产品名称"> </el-table-column>
      <el-table-column prop="createDate" label="创建日期"> </el-table-column>
      <el-table-column prop="num" label="库存数量"> </el-table-column>
      <el-table-column prop="poNum" label="正在采购数量"> </el-table-column>
      <el-table-column prop="unitName" label="计量单位"> </el-table-column>
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
      formInline: [],//查询数组
      lists: [],//显示数组
      total: 0, // 分页的数据总数量
      currPage: 1,
      page: 1//页数
    };
  },

  methods: {
    // 请求分页数据
    pageChange(currPage) {
      this.que(currPage);
    },
    //查询按钮
    que() {
      this.$axios
        .get("/main/stock/query", {
          params: {
            productCode:this.formInline.productCode,
            name:this.formInline.name,
            page: this.page,
          },
        })
        .then((res) => {
          console.log(res);
          this.lists = res.list;
          this.total = res.total;
          this.currPage = res.pageNum;
          // console.log(this.lists);
        });
    },
  },
};
</script>