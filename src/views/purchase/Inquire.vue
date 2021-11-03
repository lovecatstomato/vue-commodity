<template>
  <div>
    <!-- 查询窗口 -->
    <el-form :inline="true" :model="formInline">
      <el-form-item label="采购单编号">
        <el-input v-model="formInline.poId" placeholder="采购单编号"></el-input>
      </el-form-item>
      <el-form-item label="供应商编号">
        <el-input
          v-model="formInline.venderCode"
          placeholder="供应商编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="付款方式">
        <el-select v-model="formInline.payType">
          <el-option label="货到付款" value="1"></el-option>
          <el-option label="款到发货" value="2"></el-option>
          <el-option label="预付款到发货" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-select v-model="formInline.status">
          <el-option label="新增" value="1"></el-option>
          <el-option label="已收货" value="2"></el-option>
          <el-option label="已付款" value="3"></el-option>
          <el-option label="已了结" value="4"></el-option>
          <el-option label="已预付" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 显示 -->
    <el-table :data="form" border style="width: 100%">
      <el-table-column prop="poId" label="采购单编号"></el-table-column>
      <el-table-column prop="venderCode" label="供应商编号"></el-table-column>
      <el-table-column prop="venderName" label="供应商名字"></el-table-column>
      <el-table-column prop="payType" label="付款方式">
        <template v-slot="scope">{{ scope.row.payType | typ }}</template>
      </el-table-column>
      <el-table-column prop="status" label="处理状态">
        <template v-slot="scope">{{ scope.row.status | sta }}</template>
      </el-table-column>
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
      formInline: {
        poId: "",
        venderCode: "",
        payType: "",
        status: "",
      },
      page: 1,
      form: [],
      updShow: false,
      total: 0, // 分页的数据总数量
      currPage: 1,
    };
  },
  filters: {
    //处理状态
    sta: function (value) {
      if (value == 1) return "新增";
      else if (value == 2) return "已收货";
      else if (value == 3) return "已付款";
      else if (value == 4) return "已了结";
      else if (value == 5) return "已预付";
    },
    //付款方式
    typ: function (value) {
      if (value == 1) return "货到付款";
      else if (value == 2) return "款到发货";
      else if (value == 3) return "预付款到发货";
    },
  },
  methods: {
    // 请求分页数据
    pageChange(currPage) {
      this.page = currPage
      // console.log(currPage);
      this.onSubmit();
    },
    onSubmit() {
      this.$axios
        .get("/main/purchase/pomain/query", {
          params: {
            poId: this.formInline.poId,
            status: this.formInline.status,
            payType: this.formInline.payType,
            venderCode: this.formInline.venderCode,
            page: this.page,
          },
        })
        .then((resu) => {
          this.form = resu.list;
          this.total = resu.total;
          this.currPage = resu.pageNum;
        });
    },
  },
};
</script>