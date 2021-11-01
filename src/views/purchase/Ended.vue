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
        <el-button type="text" @click="dialog">打开嵌套表单的 Dialog</el-button>
        <template>
          <el-button type="text" size="small" @click="Addlist(scope.row)"
            >了结</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出表单 -->
    <el-dialog title="编辑姓名" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="100px">
        <el-form-item label="采购单" v-slot="scope">
          <el-radio-group v-model="scope.row">
            <el-radio :label="1">新增</el-radio>
            <el-radio :label="2">已收货</el-radio>
            <el-radio :label="3">已付款</el-radio>
            <el-radio :label="4">已了结</el-radio>
            <el-radio :label="5">已预付</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dodate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      tableList: [],
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
    dialog() {
      this.dialogFormVisible = true;
    },
    // 获取数据
    Purchase(type = 1) {
      this.$axios
        .get("/main/purchase/pomain/show?type=" + type)
        .then((restul) => {
          this.tableList = restul.list;
        });
    },
  },
  //生命周期
  created() {
    this.Purchase(); //渲染列表
  },
};
</script>