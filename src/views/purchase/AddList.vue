<template>
  <el-tabs type="border-card">
    <el-table :data="tableList" border>
      <el-table-column prop="poId" label="采购单编号"> </el-table-column>
      <el-table-column prop="venderCode" label="供应商编号"> </el-table-column>
      <el-table-column prop="payType" label="付款方式">
        <template v-slot="scope">{{ scope.row.payType | typ }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="开始日期"></el-table-column>
      <el-table-column prop="endTime" label="截止日期"></el-table-column>
      <el-table-column prop="status" label="处理状态">
        <template v-slot="scope">{{ scope.row.status | sta }}</template>
      </el-table-column>
      <el-table-column label="操作" min-width="120px">
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
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      tableList: [], //采购单数组
    };
  },
  //生命周期
  created() {
    this.Purchase(); //渲染列表
  },
  //过滤器
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
  //按钮属性
  methods: {
    //采购单列表数据封装请求事件
    Purchase() {
      this.$axios.get("/main/purchase/pomain/query").then((resu) => {
        console.log(resu);
        this.tableList = resu.list;
      });
    },
  },
};
</script>