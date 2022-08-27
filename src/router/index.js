import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import AdminLayout from '../views/AdminLayout.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import RoleList from '../views/role/RoleList.vue'
import AssignRole from '../views/role/AssignRole.vue'
import UserList from '../views/user/UserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      path: '/login'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'AdminLayout',
    component: AdminLayout,
    redirect: {
      path: 'admin/dashboard'
    },
    children: [
      {
        path: 'dashboard',
        name: '/admin/dashboard',
        component: Dashboard
      },
      {
        path: 'role',
        name: '/admin/role',
        component: RoleList
      },
      {
        path: 'assign-role',
        name: '/admin/assign-role',
        component: AssignRole
      },
      {
        path: 'user',
        name: '/admin/user',
        component: UserList
      }
    ]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  let isAuthenticated = '';
  let authUser = localStorage.getItem('token') ? true : false;
  if (authUser) {
    isAuthenticated = true;
  } else {
      isAuthenticated = false;
  }
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else if (to.name === 'Login' && isAuthenticated) next({ name: '/admin/dashboard' })
  else next();
})

export default router;
