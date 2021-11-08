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
      <span>收款次数:{{ this.lis.receCount }}</span>
      <span>收款总金额:{{ this.lis.recePrice }}</span>
      <span>付款次数 :{{ this.lis.payCount }}</span>
      <span>付款总金额:{{ this.lis.payPrice }}</span>
    </div>

    <el-form>
      <el-form-item>
        <el-button type="primary" @click="Receive">收款明细</el-button>
        <el-button type="primary" @click="Payment">付款明细</el-button>
      </el-form-item>
    </el-form>
    <!-- 付款显示 -->
    <div v-show="se == 1">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="poId" label="产品编号"></el-table-column>
        <el-table-column prop="account" label="供应商姓名"></el-table-column>
        <el-table-column prop="createTime" label="数量"></el-table-column>
        <el-table-column prop="pay_price" label="数量"></el-table-column>
        <el-table-column prop="status" label="处理状态" width="90">
          <template slot-scope="scope">{{ scope.row.status | sta }}</template>
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

    <!-- 收款显示 -->
    <div v-show="se == 2">
      <el-table :data="lists" style="width: 100%">
        <el-table-column prop="soId" label="产品编号"></el-table-column>
        <el-table-column prop="account" label="供应商姓名"></el-table-column>
        <el-table-column prop="createTime" label="数量"></el-table-column>
        <el-table-column prop="pay_price" label="数量"></el-table-column>
        <el-table-column prop="status" label="处理状态" width="90">
          <template slot-scope="scope">{{ scope.row.status | sta }}</template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currPage"
        @current-change="pageChanges"
      >
      </el-pagination>
      <el-form v-show="updShow"> </el-form>
    </div>

    <!-- 分页组件
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="currPage"
      @current-change="pageChange"
    >
    </el-pagination>
    <el-form v-show="updShow"> </el-form> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      updShow: false,
      // formInline: [], //查询数组
      lists: [], //显示收款数组
      list:[],//显示付款数组
      lis: [],
      total: 0, // 分页的数据总数量
      currPage: 1,
      tot: 0,
      curr: 1,
      pages: 1, //付款页数
      page:1,//收款页数
      value2: "",
      se: 2,
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
    // 请求付款分页数据
    pageChange(currPage) {
      this.pages = currPage;
      // this.que();
      // this.Receive();
      this.Payment();
    },
    //请求收款分页数据
    pageChanges(currPages) {
      this.page = currPages;
      // this.que();
      this.Receive();
      // this.Payment();
    },
    //查询按钮
    que() {
      console.log(this.value2);
      this.$axios
        .get("/main/report/payment/main", {
          params: {
            time: this.value2,
            // page: this.page,
          },
        })
        .then((res) => {
          // console.log(res);
          this.lis = res;
          // this.lists = res.details.list;
          // this.total = res.total;
          // this.currPage = res.pageNum;
          // console.log(this.lists);
        });
    },
    // 收款明细
    Receive() {
      this.se = 2;
      this.$axios
        .get("/main/report/payment/detail/receipt", {
          params: {
            time: this.value2,
            page: this.page,
          },
        })
        .then((resu) => {
          console.log(resu);
          // this.lis = resu;
          this.lists = resu.list;
          this.total = resu.total;
          this.currPage = resu.pageNum;
          console.log(this.lists);
        });
    },
    // 付款明细
    Payment() {
      this.se = 1;
      this.$axios
        .get("/main/report/payment/detail/pay", {
          params: {
            time: this.value2,
            page: this.pages,
          },
        })
        .then((resus) => {
          console.log(resus);
          // this.lis = resus;
          this.list = resus.list;
          this.tot = resus.total;
          this.curr = resus.pageNum;
          // console.log(this.lists);
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