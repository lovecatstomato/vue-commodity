<template>
  <div class="manager">
    <el-container style="height: 100vh">
      <el-aside>
        <el-menu
          router
          :default-active="activeIndex"
          @select="selectMenu"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="min-height: 100vh"
          :default-openeds="['1']"
        >
          <!-- 没有下一级子菜单 -->
          <el-menu-item index="/manager">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 有子菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>

            <el-menu-item index="/manager/user/list">用户管理</el-menu-item>
            <el-menu-item index="1-1">退出</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>采购管理</span>
            </template>

            <el-menu-item index="/manager/supplierlist/Supplier"
              >供应商列表</el-menu-item
            >
            <el-menu-item index="/manager/purchase/add"
              >采购单录入</el-menu-item
            >
            <el-menu-item index="/manager/purchase/addlist">采购单列表</el-menu-item>
            <el-menu-item index="/manager/purchase/ended">采购单了结</el-menu-item>
            <el-menu-item index="/manager/purchase/inquire">采购单查询</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>仓库管理</span>
            </template>
            <el-menu-item index="/manager/chart">入库登记</el-menu-item>
            <el-menu-item index="3-1">出库登记</el-menu-item>
            <el-menu-item index="3-2">库存盘点</el-menu-item>
            <el-menu-item index="3-3">库存查询</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>财务管理</span>
            </template>
            <el-menu-item index="4-1">收款登记</el-menu-item>
            <el-menu-item index="4-2">付款登记</el-menu-item>
            <el-menu-item index="4-3">收付款查询</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>销售管理</span>
            </template>
            <el-menu-item index="/manager/catgory/management"
              >产品类别管理</el-menu-item
            >
            <el-menu-item index="/manager/catgory/categorylist"
              >产品管理</el-menu-item
            >
            <el-menu-item index="5-1">客户管理</el-menu-item>
            <el-menu-item index="5-2">销售单录入</el-menu-item>
            <el-menu-item index="5-3">销售单列表</el-menu-item>
            <el-menu-item index="5-4">销售单了结</el-menu-item>
            <el-menu-item index="5-5">销售单查询</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>业务报表</span>
            </template>
            <el-menu-item index="6-1">月度采购报表</el-menu-item>
            <el-menu-item index="6-2">月度销售报表</el-menu-item>
            <el-menu-item index="6-3">月度入库报表</el-menu-item>
            <el-menu-item index="6-4">月度出库报表</el-menu-item>
            <el-menu-item index="6-5">月度库存报表</el-menu-item>
            <el-menu-item index="6-6">月度收支报表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="hd">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              ><router-link to="/manager">首页</router-link></el-breadcrumb-item
            >
            <el-breadcrumb-item v-if="menu">{{ menu }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="name">{{ name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div>
            <i class="el-icon-user-solid"></i>
          </div>
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 当前激活的菜单
      activeIndex: this.$route.path,
    };
  },
  computed: {
    ...mapState(["account"]),
    menu: function () {
      return this.$route.meta.menu;
    },
    name: function () {
      return this.$route.meta.name;
    },
  },
  methods: {
    selectMenu(index, indexPath) {
      this.activeIndex = index;
    },
  },
  created() {},
};
</script>

<style>
.hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eff2f7;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
