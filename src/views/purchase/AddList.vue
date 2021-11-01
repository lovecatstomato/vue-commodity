<template>
  <div>
    <!-- 基本信息 -->
    <el-tabs type="border-card">
      <el-table :data="tableList" border>
        <el-table-column prop="poId" label="采购单编号"> </el-table-column>
        <el-table-column prop="venderCode" label="供应商编号">
        </el-table-column>
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
              @click="deleteUser(scope.row.poId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tabs>

    <!-- 弹出修改列表 -->
    <el-dialog title="修改内容" :visible.sync="dialogVisible">
      <el-form :inline="true" :model="ReviseList" label-width="140px">
        <el-form-item label="采购单编号" prop="poId">
          <el-input v-model="ReviseList.poId" :disabled="true" />
        </el-form-item>
        <el-form-item label="创建用户">
          <el-input v-model="ReviseList.account" :disabled="true" />
        </el-form-item>

        <el-form-item label="选择供应商" prop="name">
          <el-select placeholder="请选择" v-model="ReviseList.venderCode">
            <el-option
              v-for="item in supplier"
              :value="item.venderCode"
              :key="item.name"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间">
          <el-input v-model="ReviseList.createTime" :disabled="true" />
        </el-form-item>
        <el-form-item label="附加费用">
          <el-input v-model="ReviseList.tipFee" />
        </el-form-item>
        <el-form-item label="付款方式">
          <el-select v-model="ReviseList.payType" size="mini">
            <el-option border :value="1" label="货到付款"></el-option>
            <el-option border :value="2" label="款到发货"></el-option>
            <el-option border :value="3" label="预付款到发货"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品总价">
          <el-input v-model="ReviseList.productTotal" />
        </el-form-item>
        <el-form-item label="采购总价">
          <el-input v-model="ReviseList.poTotal" />
        </el-form-item>
        <el-form-item label="最低预付款金额">
          <el-input v-model="ReviseList.prePayFee" />
        </el-form-item>
        <el-form-item label="采购单">
          <el-radio-group v-model="ReviseList.status">
            <el-radio :label="1">新增</el-radio>
            <el-radio :label="2">已收货</el-radio>
            <el-radio :label="3">已付款</el-radio>
            <el-radio :label="4">已了结</el-radio>
            <el-radio :label="5">已预付</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="ReviseList.remark"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="" @click="tain">修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
import qs from "query-string";

export default {
  data() {
    return {
      tableList: [], //采购单数组
      dialogVisible: false,
      ReviseList: [], //修改数组
      supplier: [], //供应商数组
    };
  },

  //生命周期
  created() {
    this.Purchase(); //渲染列表
    this.suppliers(); //渲染供应商列表
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
        this.tableList = resu.list;
      });
    },
    //修改按钮
    shows(data) {
      this.dialogVisible = true; //弹出窗口
      this.ReviseList = data; //获取行内数据
    },
    //获取供应商列表
    suppliers() {
      this.$axios.get("/main/purchase/vender/all").then((resu) => {
        this.supplier = resu;
      });
    },
    tain() {
      // 确定关闭
      this.dialogVisible = false;
      // 拼接数据
      let params = qs.stringify(this.ReviseList);
      // 发送数据给数据库进行修改
      this.$axios.post("/main/purchase/pomain/update", params).then((resp) => {
        console.log(resp);
        if (resp.code === 2) {
          console.log(resp);
          // 重新渲染数据
          this.Purchase();
          this.$notify({
            title: "成功",
            message: resp.message,
            type: "success",
            duration: "2000",
          });
        }
      });
    },
    //删除数据
    deleteUser(del) {
      this.$axios
        .post("/main/purchase/pomain/delete", del)
        .then((redu) => {
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
};
</script>