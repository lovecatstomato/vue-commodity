<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="产品类别">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="categoryId" label="产品序号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="产品名" width="180">
          </el-table-column>
          <el-table-column prop="remark" label="产品描述"> </el-table-column>
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

      <!-- 修改弹出的内容 -->
      <el-dialog title="编辑姓名" :visible.sync="dialogVisible" width="30%">
        <el-form>
          <el-form-item label="产品序号">
            <el-input v-model="Revise.categoryId" :disabled="true" />
          </el-form-item>
          <el-form-item label="产品名">
            <el-input v-model="Revise.name" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="Revise.remark" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false"
            >取 消</el-button
          >
          <el-button size="small" type="primary" @click="dodate"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 添加产品类别 -->
      <el-tab-pane label="添加产品类别">
        <el-form label-width="80px" style="width: 600px" :model="user_add">
          <el-form-item label="产品序号">
            <el-input v-model="user_add.categoryId" />
          </el-form-item>
          <el-form-item label="产品名">
            <el-input v-model="user_add.name" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="user_add.remark" />
          </el-form-item>
          <el-form-item>
            <el-button @click="addUser">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import qs from "query-string";

export default {
  data() {
    return {
      tableData: [], //产品类别获取
      //产品类别修改数组
      Revise: {
        categoryId: "",
        name: "",
        remark: "",
      },
      //产品类别添加数组
      user_add: {
        categoryId: "",
        name: "",
        remark: "",
      },
      updShow: false,
      total: 0, // 分页的数据总数量
      currPage: 1,
      dialogVisible: false,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    //修改事件按钮
    shows(data) {
      this.dialogVisible = true; //弹出窗口
      this.Revise = data;
    },
    pageChange(currPage) {
      // console.log(currPage);
      this.getUser(currPage);
    },
    // 修改事件的获取事件
    dodate() {
      // 确定显示
      this.dialogVisible = false;
      // 拼接数据
      let params = qs.stringify(this.Revise);
      // 发送数据给数据库进行修改
      this.$axios.post("/main/sell/category/update", params).then((resp) => {
        if (resp.code === 2) {
          // 重新渲染数据
          this.getUser();
          this.$notify({
            title: "成功",
            message: resp.message,
            type: "success",
            duration: "2000",
          });
        }
      });
    },
    // 数据的添加
    addUser() {
      // 拼接数据
      let addpa = qs.stringify(this.user_add);
      // 发送数据给数据库进行添加
      this.$axios.post("/main/sell/category/add", addpa).then((resps) => {
        if (resps.code === 2) {
          this.getUser();
          this.$notify({
            title: "成功",
            message: resps.message,
            type: "success",
            duration: "2000",
          });
          this.user_add.categoryId = "";
          this.user_add.name = "";
          this.user_add.remark = "";
        }
      });
    },
    getUser(page = 1) {
      this.$axios.get("/main/sell/category/show?page=" + page).then((resu) => {
        this.tableData = resu.list;
        this.total = resu.total;
        this.currPage = resu.pageNum;
      });
    },
  },
};
</script>