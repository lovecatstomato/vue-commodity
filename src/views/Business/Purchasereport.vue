<template>
  <div>
    <!-- 查询窗口 -->
    <el-form :inline="true">
      <el-date-picker
        v-model="value2"
        type="month"
        placeholder="选择月"
        format="yyyy 年 MM 月"
        value-format="yyyy-MM"
      >
      </el-date-picker>
      <el-form-item>
        <el-button type="primary" @click="que">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="end">
      <span> 已了结数: {{ this.lis.endtotalnum }} </span>
      <span> 采购单总数: {{ this.lis.totalnum }} </span>
      <span>采购单总金额: {{ this.lis.pototal }}</span>
      <span>已付款金额: {{ this.lis.totalpay }}</span>
    </div>

    <!-- 显示 -->
    <el-table :data="lists" style="width: 100%">
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
      updShow: false,
      formInline: [], //查询数组
      lists: [], //显示数组
      lis: [],
      total: 0, // 分页的数据总数量
      currPage: 1,
      page: 1, //页数
      value2: "",
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
      this.page = currPage;
      this.que();
    },
    //查询按钮
    que() {
      console.log(this.value2);
      this.$axios
        .get("/main/report/pomain/main", {
          params: {
            time: this.value2,
            page: this.page,
          },
        })
        .then((res) => {
          // console.log(res);
          this.lis = res;//详细
          this.lists = res.details.list;//列表
          this.total = res.details.total;
          this.currPage = res.details.pageNum;
        });
    },
  },
};
</script>

<style scoped>
.end span {
  font-weight: bold;
  padding: 10px 20px;
}
</style>