<template>
  <div>
    <el-table :data="tableList" border style="width: 100%">
      <el-table-column prop="venderCode" label="供应商编号"></el-table-column>
      <el-table-column prop="venderName" label="供应商名字"></el-table-column>
      <el-table-column prop="payType" label="付款方式">
        <template v-slot="scope">{{ scope.row.payType | typ }}</template>
      </el-table-column>
      <el-table-column prop="status" label="处理状态">
        <template v-slot="scope">{{ scope.row.status | sta }}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" v-slot="scope">
        <template>
          <el-button type="text" size="small" @click="Addlist(scope.row)"
            >编辑</el-button
          >
        </template>
        <template>
          <el-button type="text" size="small">查看</el-button>
        </template>
        <template>
          <el-button
            type="text"
            size="small"
            @click="deleteUser(scope.row.poId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableList: [],
      su:[]
    };
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
  methods: {
    //页面跳转
    Addlist(data) {
      console.log(data);
      this.$router.push({ path: "addlist/edit" ,query:{data}});
    },
    // 获取数据
    Purchase(type = 1) {
      this.$axios
        .get("/main/purchase/pomain/show?type=" + type)
        .then(restul => {
          this.tableList = restul.list;
        });
    },
     //删除数据
    deleteUser(del) {
      console.log(del);
      this.$axios.post("/main/purchase/pomain/delete", "poId="+del).then(redu => {
        console.log(redu);
        if (redu.code === 2) {
          console.log(redu);
          this.Purchase();
          this.$notify({
            title: "成功",
            message: redu.message,
            type: "success",
            duration: "2000",
          });
        }
      });
    },
  },
  //生命周期
  created() {
    this.Purchase(); //渲染列表
  },
};
</script>