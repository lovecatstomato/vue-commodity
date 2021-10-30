<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="用户列表">
        <el-table
          :data="users"
          border
          v-loading="isLoading"
          style="margin-top: 15px"
        >
          <el-table-column label="用户账号" prop="account"></el-table-column>
          <el-table-column label="用户姓名" prop="name"></el-table-column>
          <el-table-column label="添加日期" prop="createDate"></el-table-column>
          <el-table-column label="锁定状态">
            <template v-slot="scope">
              {{ scope.row.status === 0 ? "不锁定" : "锁定" }}
            </template>
          </el-table-column>
          <el-table-column label="用户权限">
            <template v-slot="scope">
              <el-tag
                size="mini"
                v-for="mod in scope.row.models"
                :key="mod.modelCode"
                border
                v-loading="isLoading"
              >
                {{ mod.modelName }}
              </el-tag>
            </template>
          </el-table-column>
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
        <!-- 修改弹出的内容 -->
        <el-dialog title="编辑姓名" :visible.sync="dialogVisible" width="30%">
          <table>
            <tr>
              <td>
                <el-tag>用户账号</el-tag>
              </td>
              <td>
                <el-input v-model="Revise.account" :disabled="true"></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>用户姓名</el-tag>
              </td>
              <td>
                <el-input v-model="Revise.name"></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>密码</el-tag>
              </td>
              <td>
                <el-input v-model="Revise.passWord"></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>日期</el-tag>
              </td>
              <td>
                <el-input
                  v-model="Revise.createDate"
                  :disabled="true"
                ></el-input>
              </td>
            </tr>
          </table>
          <el-form>
            <el-form-item label="锁定状态">
              <el-radio v-model="Revise.status" label="1">是</el-radio>
              <el-radio v-model="Revise.status" label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="权限">
              <el-checkbox-group v-model="Revise.modelcodes">
                <el-checkbox :label="1">采购管理</el-checkbox>
                <el-checkbox :label="2">销售管理</el-checkbox>
                <el-checkbox :label="3">系统管理</el-checkbox>
                <el-checkbox :label="4">财务管理</el-checkbox>
                <el-checkbox :label="5">仓库管理</el-checkbox>
                <el-checkbox :label="6">业务报表</el-checkbox>
              </el-checkbox-group>
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
      </el-tab-pane>
      <!-- 添加 -->
      <el-tab-pane label="添加用户">
        <el-form label-width="80px" style="width: 600px" :model="user_add">
          <el-form-item label="用户账号">
            <el-input v-model="user_add.account" />
          </el-form-item>
          <el-form-item label="用户姓名">
            <el-input v-model="user_add.name" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="user_add.passWord" />
          </el-form-item>
          <el-form-item label="日期">
            <el-input v-model="user_add.createDate" :disabled="true" />
          </el-form-item>
          <el-form-item label="锁定状态">
            <el-radio v-model="user_add.status" label="1">是</el-radio>
            <el-radio v-model="user_add.status" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="权限">
            <el-checkbox label="1" v-model="user_add.modelcodes"
              >采购管理</el-checkbox
            >
            <el-checkbox label="2" v-model="user_add.modelcodes"
              >销售管理</el-checkbox
            >
            <el-checkbox label="3" v-model="user_add.modelcodes"
              >系统管理</el-checkbox
            >
            <el-checkbox label="4" v-model="user_add.modelcodes"
              >财务管理</el-checkbox
            >
            <el-checkbox label="5" v-model="user_add.modelcodes"
              >仓库管理</el-checkbox
            >
            <el-checkbox label="6" v-model="user_add.modelcodes"
              >业务报表</el-checkbox
            >
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
      users: [],
      updShow: false,

      // 修改的数组
      Revise: {
        account: "",// 账号
        name: "",// 用户姓名
        passWord: "",// 用户密码
        createDate: "",// 日期
        status: "0",// 账号状态
        modelcodes: [],// 账号权限
      },

      // 添加的数组
      user_add: {
        account: "",// 账号
        name: "",// 用户姓名
        passWord: "",// 用户密码
        createDate: new Date().toISOString().substring(0, 10),// 日期
        status: "0",// 账号状态
        modelcodes: [],// 账号权限
      },
      isLoading: true, // 加载中
      total: 0, // 分页的数据总数量
      currPage: 1,
      dialogVisible: false,
    };
  },
  created() {
    //渲染页面
    this.getUserData();
    
  },
  // 按钮事件
  methods: {
    //修改事件按钮
    shows(data) {
      this.dialogVisible = true;//弹出窗口
      this.Revise.account = data.account; // 用户账号
      this.Revise.passWord = data.passWord; // 密码
      this.Revise.name = data.name; // 用户姓名
      this.Revise.createDate = data.createDate; // 日期
      // 权限
      for (let i = 0; i < data.models.length; i++) {
        this.Revise.modelcodes.push(data.models[i].modelCode);
      }
      console.log(data.models);
    },
    //封装请求事件
    getUserData(page = 1) {
      this.$axios.get("/main/system/user/show?page=" + page).then((result) => {
        this.isLoading = false;
        this.users = result.list;
        this.total = result.total;
        this.currPage = result.pageNum;
      });
    },
    // 请求分页数据
    pageChange(currPage) {
      this.getUserData(currPage);
    },
    // 修改事件的获取事件
    dodate() {
      // 确定显示
      this.dialogVisible = false;
      // 拼接数据
      let params = qs.stringify(this.Revise);
      // 发送数据给数据库进行修改
      this.$axios.post("/main/system/user/update", params).then((resp) => {
        if (resp.code === 2) {
          // 重新渲染数据
          this.getUserData();
          this.$notify({
            title: "成功",
            message: resp.message,
            type: "success",
            duration:'2000',
          });
        }
      });
    },
    // 数据的添加
    addUser() {
      // 拼接数据
      let addpa = qs.stringify(this.user_add);
      // 发送数据给数据库进行添加
      this.$axios.post("/main/system/user/add", addpa).then((resps) => {
        if (resps.code === 2) {
          this.getUserData();
          this.$notify({
            title: "成功",
            message: resps.message,
            type: "success",
            duration: "2000",
          });
          this.user_add.account = ''
          this.user_add.name = ''
          this.user_add.passWord = ''
          this.user_add.modelcodes = this.Revise.modelcodes
        }
      });
    },
    // 数据删除
    deleteUser(account) {
      this.$axios
        .post("/main/system/user/delete", "account=" + account)
        .then((redu) => { 
          if (redu.code === 2) {
            this.getUserData();
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

<style>
</style>