<template>
  <div>
    <!-- 按钮 -->
    <el-button-group>
      <el-button type="primary" @click="Delivery">货到付款</el-button>
      <el-button type="primary" @click="Payment">款到发货</el-button>
      <el-button type="primary" @click="Prepayments">预付款到发货</el-button>
    </el-button-group>
    <!-- 显示 -->
    <el-table :data="tabPosition" style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="soId" label="销售单编号" width="140"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
      <el-table-column prop="customerName" label="客户" width="100"></el-table-column>
      <el-table-column prop="account" label="创建用户" width="110"></el-table-column>
      <el-table-column prop="tipFee" label="附加费用" width="90"></el-table-column>
      <el-table-column prop="productTotal" label="产品购物总价" width="120"></el-table-column>
      <el-table-column prop="soTotal" label="销售单总价" width="100"></el-table-column>
      <el-table-column prop="payType" label="付款方式" width="90">
        <template slot-scope="scope">{{scope.row.payType|typ}}</template>
      </el-table-column>
      <el-table-column prop="prePayFee" label="最低预付款金额" width="120"></el-table-column>
      <el-table-column prop="status" label="处理状态" width="90">
        <template slot-scope="scope">{{scope.row.status|sta}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" size="mini" @click="shows(scope.row)"
            >出库</el-button
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
      tabPosition: [], // 显示数组
      payType: 1, // 付款方式
      type: 2, //采购单类型
      page: 1, //页数
      updShow: false,
      total: 0, // 分页的数据总数量
      currPage: 1,
      soId: "",
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
    //页数
    pageChange(currPage) {
      this.Delivery(currPage);
      this.Payment(currPage);
      this.Prepayments(currPage);
    },
    //货到付款
    Delivery() {
      this.payType = 1;
      this.$axios
        .get("/main/sell/somain/show", {
          params: {
            //传入参数
            payType: this.payType,
            type: this.type,
            page: this.page,
          },
        })
        .then((resu) => {
          console.log(resu);
          this.tabPosition = resu.list;
        });
    },
    //款到发货
    Payment() {
      //变更参数
      this.payType = 2;
      this.$axios
        .get("/main/sell/somain/show", {
          params: {
            payType: this.payType,
            type: this.type,
            page: this.page,
          },
        })
        .then((resus) => {
          this.tabPosition = resus.list;
        });
    },
    //预付款发货
    Prepayments() {
      this.payType = 3;
      this.$axios
        .get("/main/sell/somain/show", {
          params: {
            payType: this.payType,
            type: this.type,
            page: this.page,
          },
        })
        .then((resua) => {
          this.tabPosition = resua.list;
        });
    },
    //出库
    shows(Warehousing) {
      this.soId = Warehousing.soId;
      console.log(this.soId);
      this.payType = Warehousing.payType;
      console.log(this.payType);
      this.$axios
        .post("/main/stock/outstock", `soId=${this.soId}&payType=${this.payType}&page=${this.page}` )
        .then((restock) => {
          console.log(restock);
          if (restock.code == 2) {
            this.$notify({
              title: "成功",
              message: restock.message,
              type: "success",
              duration: "2000",
            });
          }
          if (restock.code == 3) {
            this.$notify({
              title: "失败",
              message: restock.message,
              type: "success",
              duration: "2000",
            });
          }
        });
    },
  },
};
</script>