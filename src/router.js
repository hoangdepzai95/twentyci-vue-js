import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.auth) && !router.app.loggedIn) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    } else if (to.matched.some((record) => record.path === '/login') && router.app.loggedIn) {
        next({
            path: '/post-list',
        });
    } else {
        next();
    }
});

export default router;
