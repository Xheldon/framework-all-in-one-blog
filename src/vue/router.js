import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './index/index.vue';

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: Index,
        name: 'home'
    }
];

const router = new VueRouter({
    mode: 'hash',
    routes
});
export default router;
