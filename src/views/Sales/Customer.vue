<template>
  <el-tabs type="border-card">
    <!-- 供应商列表 -->
    <el-tab-pane label="供应商列表">
      <el-table :data="supplier" border style="width: 100%">
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="contactor" label="联系人"></el-table-column>
        <el-table-column prop="createDate" label="注册日期"> </el-table-column>
        <el-table-column prop="fax" label="传真"></el-table-column>
        <el-table-column prop="name" label="供应商名称"></el-table-column>
        <el-table-column prop="postCode" label="邮政编码"> </el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column
          prop="customerCode"
          label="供应商编号"
        ></el-table-column>
        <el-table-column label="操作" min-width="150px">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="shows(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteUser(scope.row.customerCode)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination background layout="prev, pager, next" :total="total">
      </el-pagination>
      <el-form v-show="updShow"> </el-form>
    </el-tab-pane>

    <!-- 修改弹窗 -->
    <el-dialog title="编辑姓名" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="100px" :model="Revise_Supplier">
        <el-form-item label="地址">
          <el-input v-model="Revise_Supplier.address" />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="Revise_Supplier.contactor" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="Revise_Supplier.passWord" />
        </el-form-item>
        <el-form-item label="注册日期">
          <el-input v-model="Revise_Supplier.createDate" :disabled="true" />
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="Revise_Supplier.fax" />
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model="Revise_Supplier.name" />
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="Revise_Supplier.postCode" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="Revise_Supplier.tel" />
        </el-form-item>
        <el-form-item label="供应商编号">
          <el-input v-model="Revise_Supplier.customerCode" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dodate">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 供应商添加 -->
    <el-tab-pane label="添加客户">
      <el-form label-width="100px" style="width: 600px" :model="AppSupplier">
        <el-form-item label="地址">
          <el-input v-model="AppSupplier.address" />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="AppSupplier.contactor" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="AppSupplier.passWord" />
        </el-form-item>
        <el-form-item label="注册日期">
          <el-input v-model="AppSupplier.createDate" :disabled="true" />
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="AppSupplier.fax" />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="AppSupplier.name" />
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="AppSupplier.postCode" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="AppSupplier.tel" />
        </el-form-item>
        <el-form-item label="客户编号">
          <el-input v-model="AppSupplier.customerCode" />
        </el-form-item>
        <el-form-item>
          <el-button @click="addUser">保存</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import qs from "query-string";
export default {
  data() {
    return {
      //供应商列表数组
      supplier: [],
      updShow: false,
      total: 0, // 分页的数据总数量
      currPage: 1,
      //添加供应商列表数组
      AppSupplier: {
        address: "", //地址
        contactor: "", //供应商联系人
        createDate: new Date().toISOString().substring(0, 10), //注册日期
        fax: "", //传真
        name: "", //客户名称
        passWord: "", //客户密码
        postCode: "", //邮政编码
        tel: "", //电话
        customerCode: "", //客户编号
      },
      //修改供应商列表数组
      Revise_Supplier: {
        address: "", //地址
        contactor: "", //供应商联系人
        createDate: "", //注册日期
        fax: "", //传真
        name: "", //供应商名称
        passWord: "", //供应商密码
        postCode: "", //邮政编码
        tel: "", //电话
        customerCode: "", //供应商编号
      },
      dialogVisible: false,
    };
  },
  created() {
    this.supplierlist(); //调用方式渲染数据
  },
  methods: {
    // 封装函数方式（供应商列表）
    supplierlist(page = 1) {
      this.$axios
        .get("/main/sell/customer/show?page=" + page)
        .then((restul) => {
          // console.log(restul);
          this.supplier = restul.list; //供应商列表数据
          this.total = restul.total;
          this.currPage = restul.pageNum;
          //   console.log(this.supplier);
        });
    },
    //修改获取列表
    shows(data) {
      this.dialogVisible = true;
      this.Revise_Supplier = data;
    },
    //修改确定按钮
    dodate() {
      //关闭窗口
      this.dialogVisible = false;
      //拼接数据
      let doda = qs.stringify(this.Revise_Supplier);
      //传入后台
      this.$axios.post("/main/sell/customer/update", doda).then((Resltu) => {
        console.log(Resltu);
        //成功
        if (Resltu.code == 2) {
          //重新渲染数据
          this.supplierlist();
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
          this.supplierlist();
          this.$notify({
            title: "修改失败",
            message: Resltu.message,
            type: "success",
            duration: "2000",
          });
        }
      });
    },
    //添加保存
    addUser() {
      //拼接数据
      let AppSu = qs.stringify(this.AppSupplier);
      //传入后台
      this.$axios.post("/main/sell/customer/add", AppSu).then((resu) => {
        if (resu.code == 2) {
          //调用方法重新渲染页面
          this.supplierlist();
          //成功提示
          this.$notify({
            title: "添加成功",
            message: "添加客户",
            type: "success",
            duration: "2000",
          });
          //清空列表
          this.AppSupplier.address = "";
          this.AppSupplier.contactor = "";
          this.AppSupplier.fax = "";
          this.AppSupplier.name = "";
          this.AppSupplier.postCode = "";
          this.AppSupplier.tel = "";
          this.AppSupplier.venderCode = "";
          this.AppSupplier.passWord = "";
        }
        if (resu == 3) {
          this.supplierlist();
          this.$notify({
            title: "添加失败",
            message: resu.message,
            type: "success",
            duration: "2000",
          });
        }
      });
    },
    deleteUser(venderCode) {
      this.$axios
        .post("/main/purchase/vender/delete", "venderCode=" + venderCode)
        .then((deletsu) => {
          if (deletsu.code == 2) {
            this.supplierlist();
            this.$notify({
              title: "删除",
              message: deletsu.message,
              type: "success",
              duration: "2000",
            });
          }
        });
    },
  },
};
</script>