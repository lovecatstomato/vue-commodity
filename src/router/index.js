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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Manager.vue'),
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
        path:'catgory/management',component:() => import('@/views/Category/management.vue'),
        meta:{
          menu:'产品类别管理',
          name:'产品类别'
        }
      },
      {
        path:'catgory/categorylist',component:() => import('@/views/Category/CategoryList.vue'),
        meta:{
          menu:'产品分类列表',
          name:'产品'
        }
      },
      {
        path:'supplierlist/Supplier',component:() => import('@/views/supplierlist/Supplier.vue'),
        meta:{
          menu:'供应商列表',
          name:'供应商'
        }
      },
      {
        path:'purchase/add',component:() => import('@/views/purchase/Add.vue'),
        meta:{
          menu:'采购单录入',
          name:'添加'
        }
      },
      {
        path:'purchase/addlist',component:() => import('@/views/purchase/AddList.vue'),
        meta:{
          menu:'采购单列表',
          name:'列表'
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
