import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './index/index.vue';
import Post from './post/index.vue';
import fileListObj from 'src/common/md/post-list';

// md 文件列表
let fileListArr = Object.keys(fileListObj);

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
    console.log(route);
    if ((!route.query.title && route.name === 'post') || (!fileListArr.includes(route.params.name))) {
        router.push({path: '/'});
    }
});
export default router;
