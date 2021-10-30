<template>
  <el-tabs type="border-card">
    <p>{{where}}12</p>
    <el-table :data="tableList" border style="width: 100%">
      <el-table-column prop="poId" label="采购单编号"> </el-table-column>
      <el-table-column prop="venderCode" label="供应商编号"> </el-table-column>
      <el-table-column prop="payType" label="付款方式" ></el-table-column>
      <el-table-column prop="createTime" label="开始日期"></el-table-column>
      <el-table-column prop="endTime" label="截止日期"></el-table-column>
      <el-table-column prop="status" label="处理状态"></el-table-column>
    </el-table>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      tableList: [],
      
    };
  },
  //生命周期
  created() {
    this.Purchase();
  },
  //计算属性
  computed: {
     where: function(){
      if(this.tableList.payType == 1){
        return "问答";
      }else if(this.tableList.payType == 2){
        return '问答'
      }else if(this.tableList.payType == 3){
        return '招聘'
      }
    }
  },
  //按钮属性
  methods: {
    //采购单列表数据封装请求事件
    Purchase() {
      this.$axios.get("/main/purchase/pomain/query").then(resu => {
        console.log(resu);
        this.tableList = resu.list;
      });
    },
  },
};
</script>