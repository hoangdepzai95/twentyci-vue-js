import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login.vue';
import PostList from './pages/post-list/PostList.vue';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/post-list',
            name: 'post-list',
            component: PostList,
            meta: { auth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '**',
            redirect: '/post-list',
        },
    ]
});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('token');

    if (to.matched.some((record) => record.meta.auth) && !loggedIn) {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        });
    } else if (to.matched.some((record) => record.path === '/login') && loggedIn) {
        next({
            path: '/post-list',
        });
    } else {
        next();
    }
});

export default router;
