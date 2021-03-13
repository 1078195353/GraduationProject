import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

 {
   path: '/',
   component: Layout,
   redirect: '/dashboard',
   children: [{
     path: 'dashboard',
     name: 'Dashboard',
     component: () => import('@/views/dashboard/index'),
     meta: { title: '首页', icon: 'dashboard' }
   }]
 },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
 {
   path: '/exam',
   component: Layout,
   redirect: '/exam/list',
   name: 'exam',
   meta: { authStr: '/exam', title: '考试管理', icon: 'example' },
   children: [{
     path: 'list',
     name: 'examList',
     component: () => import('@/views/exam/examList'),
     meta: { authStr: '/exam/list',  title: '当前考试列表', icon: 'dashboard' }
   },
   {path: 'detail',
     name: 'examDetail',
     hidden: true,
     component: () => import('@/views/exam/examDetail'),
     meta: {authStr: '/exam/detail',  title: 'ExamDetail', icon: 'dashboard' }
   },
   {path: 'answer',
     name: 'answer',
     hidden: true,
     component: () => import('@/views/exam/viewAnswer'),
     meta: {authStr: '/exam/answer', title: 'ExamAnswer', icon: 'dashboard' }
   },
   {path: 'record/list',
     name: 'ExamRecord',
     component: () => import('@/views/exam/examRecord'),
     meta: {authStr: '/examRecord/list', title: '已完成考试回顾', icon: 'eye-open' }
   },
   {path: 'record/viewAnswer',
     name: 'viewAnswer',
     hidden: true,
     component: () => import('@/views/exam/viewAnswer'),
     meta: {authStr: '/examRecord/view', title: 'viewAnswer', icon: 'eye-open' }
   }]
 },

 {
   path: '/question',
   component: Layout,
   redirect: '/question/list',
   name: 'question',
   meta: { authStr: '/question', title: '试题', icon: 'form' },
   children: [{
     path: 'list',
     name: 'questionManager',
     component: () => import('@/views/exam/questionManager'),
     meta: {authStr: '/question/list', title: '试题管理', icon: 'form' }
   }]
 },

 {
   path: '/paper',
   component: Layout,
   redirect: '/paper/list',
   name: 'paper',
   meta: { authStr: '/paper', title: '试卷', icon: 'table' },
   children: [{
     path: 'list',
     name: 'paperManager',
     component: () => import('@/views/exam/paperManager'),
     meta: {authStr: '/paper/list', title: '试卷管理', icon: 'table' }
   }]
 },

 {
   path: '/user',
   component: Layout,
   redirect: '/user/list',
   name: 'user',
   meta: { authStr: '/user', title: '用户', icon: 'user' },
   children: [{
     path: 'list',
     name: 'UserList',
     component: () => import('@/views/user/userList'),
     meta: {authStr: '/user/list', title: '用户管理', icon: 'user' }
   }]
 }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
