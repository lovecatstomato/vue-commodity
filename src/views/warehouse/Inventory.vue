<template>
  <div>
    <!-- 显示 -->
    <el-table :data="lists" style="width: 100%">
      <el-table-column prop="productCode" label="产品编号"> </el-table-column>
      <el-table-column prop="name" label="产品名称"> </el-table-column>
      <el-table-column prop="createDate" label="创建日期"> </el-table-column>
      <el-table-column prop="num" label="库存数量"> </el-table-column>
      <el-table-column prop="poNum" label="正在采购数量"> </el-table-column>
      <el-table-column fixed="right" label="操作" v-slot="scope">
        <template>
          <el-button type="text" size="small" @click="Addlist(scope.row)"
            >盘点</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出窗口 -->
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <el-form label-width="100px" :model="Revise_Supplier">
        <el-form-item label="产品原始数量">
          <el-input v-model="Revise_Supplier.num" />
        </el-form-item>
        <el-form-item label="变化数量">
          <el-input v-model="Revise_Supplier.originNum" />
        </el-form-item>
        <el-form-item label="变化类型">
          <el-select v-model="Revise_Supplier.type">
            <el-option label="损耗" value="损耗"></el-option>
            <el-option label="盘余" value="盘余"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变化原因">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入变化原因"
            v-model="Revise_Supplier.description"
          />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dodate">确 定</el-button>
      </span>
    </el-dialog>

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
      updShow: false,
      lists: [], //显示数组
      Revise_Supplier: {
        productCode: "",
        originNum: "",
        num: "",
        type: "",
        description: "",
        page: "",
      }, //弹出数组
      total: 0, // 分页的数据总数量
      currPage: 1,
      dialogVisible: false,
    };
  },
  created() {
    this.que();
  },

  methods: {
    // 请求分页数据
    pageChange(currPage) {
      this.que(currPage);
    },
    //获取产品数据
    que(page = 1) {
      this.$axios.get("/main/stock/query?page=" + page).then((res) => {
        this.lists = res.list;
        this.total = res.total;
        this.currPage = res.pageNum;
        // console.log(this.lists);
      });
    },
    //盘点按钮
    Addlist(lsit) {
      console.log(lsit);
      this.dialogVisible = true;
      this.Revise_Supplier = lsit;
      console.log(this.Revise_Supplier);
    },
    dodate() {
      this.dialogVisible = false;
      console.log(this.Revise_Supplier);
      this.$axios
        .get("/main/stock/checkstock", {
          params: {
            productCode: this.Revise_Supplier.productCode,
            originNum: this.Revise_Supplier.num,
            type:this.Revise_Supplier.type,
            description: this.Revise_Supplier.description,
            num:this.Revise_Supplier.originNum,
            page: this.page,
          },
        })
        .then((res) => {
          console.log(res);
          this.lists = res.list;
          this.total = res.total;
          this.currPage = res.pageNum;
          // console.log(this.lists);
          this.que();
        });
    },
  },
};
</script>