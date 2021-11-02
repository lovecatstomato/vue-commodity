<template>
  <div>
    <el-button-group>
      <el-button type="primary" @click="Delivery">货到付款</el-button>
      <el-button type="primary" @click="Payment">款到发货</el-button>
      <el-button type="primary" @click="Prepayments">预付款到发货</el-button>
    </el-button-group>
    <!-- 显示 -->
    <el-table :data="tabPosition" style="width: 100%">
      <el-table-column prop="poId" label="采购单编号"></el-table-column>
      <el-table-column prop="account" label="采购单编号"></el-table-column>
      <el-table-column prop="venderCode" label="供应商编号"></el-table-column>
      <el-table-column prop="venderName" label="供应商名字"></el-table-column>
      <el-table-column prop="payType" label="付款方式">
        <template v-slot="scope">{{ scope.row.payType | typ }}</template>
      </el-table-column>
      <el-table-column prop="status" label="处理状态">
        <template v-slot="scope">{{ scope.row.status | sta }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" size="mini" @click="shows(scope.row)">入库</el-button>
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
    pageChange(currPage) {
      this.Delivery(currPage);
      this.Payment(currPage);
      this.Prepayments(currPage);
    },
    //货到付款
    Delivery() {
      this.payType = 1;
      this.$axios
        .get("/main/purchase/pomain/show", {
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
        .get("/main/purchase/pomain/show", {
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
        .get("/main/purchase/pomain/show", {
          params: {
            payType: this.payType,
            type: this.type,
            page: this.page,
          },
        })
        .then((resua) => {
          console.log(resua);
          this.tabPosition = resua.list;
        });
    },
  },
};
</script>