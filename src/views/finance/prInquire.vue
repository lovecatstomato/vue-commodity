<template>
  <div>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="收支类型">
        <el-select v-model="formInline.type" placeholder="收支类型">
          <el-option label="支出" value="支出"></el-option>
          <el-option label="收入" value="收入"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款方式">
        <el-select v-model="formInline.payType">
          <el-option label="货到付款" value="1"></el-option>
          <el-option label="款到发货" value="2"></el-option>
          <el-option label="预付款到发货" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="que">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="lists" style="width: 100%">
      <el-table-column prop="account" label="创建用户"> </el-table-column>
      <el-table-column prop="ordercode" label="相关单据号"> </el-table-column>
      <el-table-column prop="payPrice" label="支付价格"> </el-table-column>
      <el-table-column prop="payTime" label="开始日期"> </el-table-column>
      <el-table-column prop="payType" label="单据付款方式">
        <template v-slot="scope">{{ scope.row.payType | typ }}</template>
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
      formInline: {
        type: "",
        payType: "",
      },
      lists: [],
      total: 0, // 分页的数据总数量
      currPage: 1,
      page: 1
    };
  },
  created() {
    this.que();
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
      this.que();
    },
    que(pay) {
      // console.log(pay);
      console.log(this.formInline.type);
      console.log(this.formInline.payType);
      this.$axios
        .get("/main/finance/query", {
          params: {
            type: this.formInline.type,
            payType: this.formInline.payType,
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