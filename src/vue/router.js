import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './index/index.vue';
import Post from './post/index.vue';

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: Index,
        name: 'home'
    },
    {
        path: '/post',
        component: Post,
        name: 'post'
    }
];

const router = new VueRouter({
    mode: 'hash',
    routes
});

router.afterEach(route => {
    // 处理文章页没有参数情况
    if (!route.query.title && route.name === 'post') {
        router.push({path: '/'});
    }
});
export default router;
