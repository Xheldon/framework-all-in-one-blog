import Vue from 'vue';
import router from './router';

new Vue({
    router,
    // template: '<App />',
    render (h) { // 用 render 代替 template 和 components 这两个选项
        return h('router-view', {
            attrs: {
                class: 'router-view'
            }
        })
    }/*,
    components: {
        App
    }*/
}).$mount('#mount');

