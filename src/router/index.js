import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/t1',
    name: 't1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "t" */ '../views/t1.vue'),
    redirect: '/t1/t2',
    children: [
      {
        path: '/t1/t2',
        name: 't2',
        component: () => import(/* webpackChunkName: "t" */ '../views/t2.vue'),
        redirect: '/t1/t2/t3',
        children: [
          {
            path: '/t1/t2/t3',
            name: 't3',
            component: () => import(/* webpackChunkName: "t" */ '../views/t3.vue'),
          },
        ]
      },
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
