import Vue from 'vue'
import VueRouter from 'vue-router'
import routerApp from './modules/routerApp'

Vue.use(VueRouter)

import Layout from '@/layout'

const staticRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/following',
	  name: 'home',
    children: [
      {
        path: 'following',
        name: 'following',
        component: () => import('@/views/following'),
        meta: { title: '追蹤', index: 1 },
      },
      {
        path: 'for-you',
        name: 'for-you',
        component: () => import('@/views/forYou'),
        meta: { title: '推薦', index: 1 },
      },
    ],
  },
  ...routerApp,
]

const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
  linkActiveClass: 'actived',
  routes: staticRoutes,
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
      behavior: 'smooth'
    }
  }
})

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err)
}


export default router
