<template>
  <!-- 基本信息 -->
  <el-form :inline="true" :model="poinfo" label-width="140px">
    <el-form-item label="采购单编号">
      <el-input v-model="poinfo.pold" :disabled="true" />
    </el-form-item>
    <el-form-item label="选择供应商" prop="name">
      <el-select placeholder="请选择" v-model="supplier.name">
        <el-option
          v-for="item in supplier"
          :value="item.name"
          :key="item.name"
        >
        {{item.name}}
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-input v-model="poinfo.createTime" :disabled="true" />
    </el-form-item>
    <el-form-item label="附加费用">
      <el-input v-model="poinfo.tipFee" />
    </el-form-item>
    <el-form-item label="付款方式">
      <el-radio-group v-model="poinfo.payType">
        <el-radio :label="1">货到付款</el-radio>
        <el-radio :label="2">款到发货</el-radio>
        <el-radio :label="3">预付款到发货</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="产品总价">
      <el-input v-model="poinfo.productTotal" />
    </el-form-item>
    <el-form-item label="采购总价">
      <el-input v-model="poinfo.poTotal" />
    </el-form-item>
    <el-form-item label="最低预付款金额">
      <el-input v-model="poinfo.prePayFee" />
    </el-form-item>
    <el-form-item label="采购单">
      <el-radio-group v-model="poinfo.status">
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
        v-model="poinfo.remark"
      >
      </el-input>
    </el-form-item>
    <!-- 添加明细 -->
    <el-form-item>
      <el-button type="success" @click="addItem">添加明细</el-button>
      <el-table :data="poinfo.poitems" border style="width: 1000px">
        <el-table-column label="产品编号">
          <template v-slot="scope">
            <el-input v-model="scope.row.productCode" />
          </template>
        </el-table-column>
        <el-table-column label="产品名称">
          <template v-slot="scope">
            <el-input v-model="scope.row.name" />
          </template>
        </el-table-column>
        <el-table-column label="数量单位">
          <template v-slot="scope">
            <el-input v-model="scope.row.unitName" />
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template v-slot="scope">
            <el-input-number
              v-model="scope.row.num"
              controls-position="right"
              size="mini"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="产品单价">
          <template v-slot="scope">
            <el-input v-model="scope.row.unitPrice" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60px">
          <template v-slot="scope">
            <el-button
              icon="el-icon-delete"
              type="danger"
              size="mini"
              circle
              @click="delet(scope.row, scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>

<script>
import { generateId } from "@/utils/date";
export default {
  data() {
    return {
      //添加采购单列表
      poinfo: {
        pold: generateId(), //采购单编号
        venderCode: "", //供应商编号
        account: "", //创建用户
        createTime: new Date().toISOString().substring(0, 10), //时间
        tipFee: 0, //附加费用
        productTotal: "", //产品总价
        poTotal: "", //采购总价
        payType: 1, //付款方式
        prePayFee: 0, //最低预付款金额
        status: 1, //采购单状态
        remark: "", // 备注
        poitems: [], // 采购产品明细
      },
      //供应商列表
      supplier: {},
    };
  },
  created() {
    // 渲染供应商列表
    this.suppliers();
  },
  methods: {
    //获取供应商列表
    suppliers() {
      this.$axios.get("/main/purchase/vender/all").then((resu) => {
        this.supplier = resu;
      });
    },
    //明细添加按钮
    addItem() {
      this.poinfo.poitems.push({
        productCode: "",
        unitName: "",
        unitPrice: 0,
        num: 0,
        itemPrice: 0,
      });
    },
    //明细删除按钮
    delet(row, index) {
      this.poinfo.poitems.splice(index, 1);
    },
  },
};
</script>