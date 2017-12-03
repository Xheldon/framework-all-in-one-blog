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

export default router;
