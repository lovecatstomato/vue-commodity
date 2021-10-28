<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="categoryId" label="序号" width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="remark" label="描述"> </el-table-column>
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
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser(page = 1) {
      this.$axios.get("/main/sell/category/show?page=" + page).then((resu) => {
        this.tableData = resu.list;
      });
    },
  },
};
</script>