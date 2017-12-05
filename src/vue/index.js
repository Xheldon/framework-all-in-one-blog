import Vue from 'vue';
import router from './router';
import App from './App.vue';

// css lib
import 'src/common/lib/css/darcula.css';
import 'src/common/lib/css/main.scss';

new Vue({
    router,
    template: '<App />',
   /* render (h) { // 用 render 代替 template 和 components 这两个选项, 不足是 render 不能再渲染组件了...
        return h('div', {
            attrs: {
                class: 'main-view'
            }
        }, [
            h('side-bar', {
                attrs: {
                    class: 'side-bar'
                }
            }),
            h('router-view', {})
        ])
    },*/
    components: {
        App
    }
}).$mount('#mount');

