import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/manager',
    name: 'Manager',
    component: () => import('../views/Manager.vue'),
    children: [
      // 子路由的默认路由
      {
        path: '',
        component: () => import('@/views/manager/Home.vue'),
        meta: {

        }
      },
      {
        path: 'chart', component: () => import('@/views/manager/UserChart.vue'),
        // meta选项：路由信息，可添加自定义数据
        meta: {
          menu: '图表',
          name: '用户分布'
        }
      },
      {
        path: 'user/list', component: () => import('@/views/manager/UserList.vue'),
        meta: {
          menu: '数据管理',
          name: '用户列表'
        }
      },
      {
        path: 'catgory/management', component: () => import('@/views/Category/management.vue'),
        meta: {
          menu: '产品类别管理',
          name: '产品类别'
        }
      },
      {
        path: 'catgory/categorylist', component: () => import('@/views/Category/CategoryList.vue'),
        meta: {
          menu: '产品分类列表',
          name: '产品'
        }
      },
      {
        path: 'supplierlist/Supplier', component: () => import('@/views/supplierlist/Supplier.vue'),
        meta: {
          menu: '采购管理',
          name: '供应商列表'
        }
      },
      {
        path: 'purchase/add', component: () => import('@/views/purchase/Add.vue'),
        meta: {
          menu: '采购管理',
          name: '采购单录入'
        }
      },
      {
        path: 'purchase/addlist', component: () => import('@/views/purchase/AddList.vue'),
        meta: {
          menu: '采购单管理',
          name: '采购单列表'
        }
      },
      {
        path: 'purchase/addlist/edit', component: () => import('@/views/purchase/Edit.vue'),
        meta:{
          menu:'采购单列表',
          name: '采购单列表修改'
        }
      },
      {
        path: 'purchase/ended', component: () => import('@/views/purchase/Ended.vue'),
        meta: {
          menu: '采购单管理',
          name: '采购单了结'
        }
      },
      {
        path: 'purchase/inquire', component: () => import('@/views/purchase/Inquire.vue'),
        meta: {
          menu: '采购单管理',
          name: '采购单查询'
        }
      },
      {
        path: 'warehouse/stock', component: () => import('@/views/warehouse/Stock.vue'),
        meta: {
          menu: '仓库管理',
          name: '入库登记'
        }
      },
      {
        path: 'warehouse/inventory', component: () => import('@/views/warehouse/Inventory.vue'),
        meta: {
          menu: '仓库管理',
          name: '库存盘点'
        }
      },
      {
        path: 'warehouse/warinquire', component: () => import('@/views/warehouse/Warinquire.vue'),
        meta: {
          menu: '仓库管理',
          name: '库存查询'
        }
      },
      {
        path: 'finance/receive', component: () => import('@/views/finance/Receive.vue'),
        meta: {
          menu: '财务管理',
          name: '收款登记'
        }
      },
      {
        path: 'finance/payment', component: () => import('@/views/finance/Payment.vue'),
        meta: {
          menu: '财务管理',
          name: '付款登记'
        }
      },
      {
        path: 'finance/prinquire', component: () => import('@/views/finance/prInquire.vue'),
        meta: {
          menu: '财务管理',
          name: '收付款查询'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
