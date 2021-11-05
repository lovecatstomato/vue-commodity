<template>
  <el-tabs>
    <el-tab-pane label="产品列表">
      <el-table :data="table" border style="width: 100%">
        <el-table-column
          prop="productCode"
          label="产品编号"
          width="180"
        ></el-table-column>
        <el-table-column prop="categoryId" label="分类编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="产品名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="销售价"> </el-table-column>
        <el-table-column prop="unitName" label="数量单位"></el-table-column>
        <el-table-column label="操作">
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
    </el-tab-pane>

    <!-- 修改弹窗 -->
    <el-dialog title="编辑姓名" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="100px" :model="Revise_Supplier">
        <el-form-item label="产品编号">
          <el-input v-model="Revise_Supplier.productCode" />
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="Revise_Supplier.name" />
        </el-form-item>
        <el-form-item label="数量单位">
          <el-input v-model="Revise_Supplier.unitName" />
        </el-form-item>
        <el-form-item label="分类编号">
          <el-input v-model="Revise_Supplier.categoryId" />
        </el-form-item>
        <el-form-item label="销售价">
          <el-input v-model="Revise_Supplier.price" />
        </el-form-item>
        <el-form-item label="添加日期">
          <el-input v-model="Revise_Supplier.createDate" :disabled="true" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="Revise_Supplier.remark" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dodate">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加产品列表 -->
    <el-tab-pane label="添加商品">
      <el-form label-width="80px" style="width: 600px" v-model="add_table">
        <el-form-item label="产品编号">
          <el-input v-model="add_table.productCode" />
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="add_table.name" />
        </el-form-item>
        <el-form-item label="数量单位">
          <el-input v-model="add_table.unitName" />
        </el-form-item>
        <el-form-item label="分类编号">
          <el-input v-model="add_table.categoryId" />
        </el-form-item>
        <el-form-item label="销售价">
          <el-input v-model="add_table.price" />
        </el-form-item>
        <el-form-item label="添加日期">
          <el-input v-model="add_table.createDate" :disabled="true" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="add_table.remark" />
        </el-form-item>
        <el-button size="small" @click="Addto">确定</el-button>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import qs from "query-string";
export default {
  data() {
    return {
      dialogVisible: false,
      updShow: false,
      total: 0, // 分页的数据总数量
      currPage: 1,
      table: [], // 请求产品数据的数组
      // 添加数据的数组
      add_table: {
        productCode: "", //产品编号
        name: "", //产品名称
        unitName:"",//数量单位
        categoryId: "", //分类编号
        price: "", //销售价
        createDate: new Date().toISOString().substring(0, 10), //添加日期
        remark: "", //描述
      },
      //修改数组
      Revise_Supplier:{
        productCode: "", //产品编号
        name: "", //产品名称
        unitName:"",//数量单位
        categoryId: "", //分类编号
        price: "", //销售价
        createDate: "", //添加日期
        remark: "", //描述
      }
    };
  },
  //渲染
  created() {
    this.commoList();
  },
  methods: {
    // 请求分页数据
    pageChange(currPage) {
      // console.log(currPage);
      this.commoList(currPage);
    },
    // 请求渲染数据
    commoList(page = 1) {
      this.$axios.get("/main/sell/product/show?page=" + page).then((result) => {
        this.table = result.list;
        this.total = result.total;
        this.currPage = result.pageNum;
      });
    },
    //修改获取列表
    shows(data) {
      this.dialogVisible = true;
      this.Revise_Supplier = data; //获取修改数据
      // console.log(Revi.venderCode);
    },
    //修改确定按钮
    dodate() {
      //关闭窗口
      this.dialogVisible = false;
      //拼接数据
      let doda = qs.stringify(this.Revise_Supplier);
      //传入后台
      this.$axios.post("/main/sell/product/update", doda).then((Resltu) => {
        console.log(Resltu);
        //成功
        if (Resltu.code == 2) {
          //重新渲染数据
          this.commoList();
          //成功提示
          this.$notify({
            title: "修改成功",
            message: Resltu.message,
            type: "success",
            duration: "2000",
          });
        }
        //失败
        if (Resltu.code == 3) {
          this.commoList();
          this.$notify({
            title: "修改失败",
            message: Resltu.message,
            type: "success",
            duration: "2000",
          });
        }
      });
    },
    //添加产品
    Addto() {
      let AppSu = qs.stringify(this.add_table);
      this.$axios.post("/main/sell/product/add", AppSu).then((resu) => {
        if (resu.code == 2) {
          //调用方法重新渲染页面
          this.commoList();
          //成功提示
          this.$notify({
            title: "添加成功",
            message: resu.message,
            type: "success",
            duration: "2000",
          });
          //清空列表
          this.add_table.productCode = ""
          this.add_table.name = ""
          this.add_table.categoryId = ""
          this.add_table.price = ""
          this.add_table.remark = ""
          this.add_table.unitName = ""
        }
        if (resu.code == 3) {
          this.commoList();
          this.$notify({
            title: "添加失败",
            message: resu.message,
            type: "success",
            duration: "2000",
          });
        }
        if (resu.code == 4) {
          this.commoList();
          this.$notify({
            title: "添加错误",
            message: resu.message,
            type: "success",
            duration: "2000",
          });
        }
      });
    },
  },
};
</script>