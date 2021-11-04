<template>
  <div>
    <!-- 基本信息 -->
    <el-form :inline="true" :model="ReviseList" label-width="140px">
      <el-form-item label="采购单编号" prop="poId">
        <el-input v-model="ReviseList.soId" :disabled="true" />
      </el-form-item>
      <el-form-item label="创建用户">
        <el-input v-model="ReviseList.account" :disabled="true" />
      </el-form-item>

      <el-form-item label="选择客户" prop="name">
        <el-select placeholder="请选择" v-model="ReviseList.customerCode">
          <el-option
            v-for="item in supplier"
            :value="item.customerCode"
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
      <el-form-item>
        <el-button type="success" @click="addItem">添加明细</el-button>
        <el-table :data="ReviseList.soitems" border style="width: 1000px">
          <el-table-column type="index" label="序号" />
          <el-table-column label="产品编号">
            <template v-slot="scope">
              <el-input v-model="scope.row.productCode" style="width: 100px" />
              <i
                @click="showProductDialog(scope.$index)"
                class="el-icon-edit"
              ></i>
            </template>
          </el-table-column>
          <el-table-column label="产品名称">
            <template v-slot="scope">
              <el-input v-model="scope.row.productName" />
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
                style="width: 120px"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="产品单价">
            <template v-slot="scope">
              <el-input v-model="scope.row.unitPrice" />
            </template>
          </el-table-column>
          <el-table-column label="明细总价">
            <template v-slot="scope">
              <el-input v-model="scope.row.itemPrice" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60px">
            <template v-slot="scope">
              <el-button
                icon="el-icon-delete"
                type="danger"
                size="mini"
                circle
                @click="delet(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

    <!-- 弹出消息 -->
    <el-dialog title="选择产品" :visible.sync="dialogProductVisible">
      <el-button type="primary" size="default" @click="Obtain">确定</el-button>

      <el-table
        :data="currPage"
        border
        v-loading="loadProduct"
        highlight-current-row
        @current-change="selectProduct"
        height="250"
      >
        <el-table-column
          property="productCode"
          label="产品编号"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="产品名称"
          width="200"
        ></el-table-column>
        <el-table-column property="unitName" label="数量单位"></el-table-column>
      </el-table>
    </el-dialog>

    <el-button type="" @click="tain">修改</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRead: true,
      selectProductIndex: -1,
      loadProduct: false,
      dialogProductVisible: false,
      ReviseList: {
          soitems: []
      }, //修改数组
      supplier: [], //供应商列表
      currPage: [], //产品管理列表
    };
  },
  //生命周期
  created() {
    this.Purchase(); //渲染列表
    this.Su();
    this.suppliers();
  },
  //按钮属性
  methods: {
    //明细添加按钮
    addItem() {
      this.ReviseList.soitems.push({
        productCode: "",
        productName:"",
        unitName: "",
        unitPrice: 0,
        num: 0,
        itemPrice: 0,
      });
    },
    // 选择商品确定按钮
    Obtain() {
      this.dialogProductVisible = false;
    },
    //明细删除按钮
    delet(index) {
      this.ReviseList.soitems.splice(index, 1);
    },
    //选择商品
    showProductDialog(idx) {
      this.selectProductIndex = idx;
      this.dialogProductVisible = true;
      this.loadProduct = true;
      //获取明细产品管理数据
      this.$axios.get("/main/sell/product/all").then((result) => {
        console.log(result);
        this.currPage = result;
        this.loadProduct = false;
      });
    },
    //显示选中行的数据
    selectProduct(currentRow) {
        console.log(currentRow);
      //currentRow参数是选中行的值
      //获得选中明细的数据
      let item = this.ReviseList.soitems[this.selectProductIndex];
      let { productCode, name, unitName } = currentRow;
      //将选中行的值负值给选中明细
      Object.assign(item, { productCode, productName: name, unitName });
    },
    //获取客户列表
    suppliers() {
      this.$axios.get("/main/sell/customer/show").then((resu) => {
        console.log(resu);
        this.supplier = resu.list;
      });
    },
    //采购单列表数据封装请求事件
    Purchase() {
      this.ReviseList = {...this.$route.query.data, soitems: []}; //获取传参过来的数值
    },
    //明细
    Su() {
      let soId = this.ReviseList.soId;
      this.$axios
        .get("/main/sell/somain/queryItem", {
          params: {
            soId: soId,
          },
        })
        .then((res) => {
          // console.log(this.ReviseList.venderCode);
        //   console.log(res);
          this.ReviseList.soitems = res;
        });
    },
    //添加
    tain() {
      // 确定关闭
      this.$axios
        .post("/main/sell/somain/update", JSON.stringify(this.ReviseList), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((re) => {
          if (re.code == 2) {
            this.$notify({
              title: "成功",
              message: re.message,
              type: "success",
              duration: "2000",
            });
          } else if (re.code == 3) {
            this.$notify({
              title: "失败",
              message: re.message,
              type: "success",
              duration: "2000",
            });
          }
        });
    },
  },
  //监听
  watch: {
    //预付款金额监听
    "ReviseList.payType": {
      handler(val) {
        this.ReviseList.prePayFee = 0;
        if (val === 3) {
          this.isRead = false; // 不是只读，可编辑
        } else {
          this.isRead = true; // 不可编辑
        }
      },
    },
    //产品总价监听
    "ReviseList.soitems": {
      handler(val) {
        let total = 0;
        for (let i = 0; i < val.length; i++) {
          total += Number(val[i].num * val[i].unitPrice);
          val[i].itemPrice = Number(val[i].num * val[i].unitPrice);
        }

        this.ReviseList.productTotal = total;
        this.ReviseList.poTotal = this.ReviseList.productTotal;
      },

      deep: true, // 深度监听，当监听的对象的属性变化时，也会触发监听器
    },
    // 附加费用监听
    "ReviseList.tipFee": {
      handler(val) {
        this.ReviseList.poTotal = Number(val) + Number(this.ReviseList.productTotal);
      },
    },
  },
};
</script>