<template>
    <div>
        <ul>
            <li><router-link :to="{path: '/'}">首页</router-link></li>
            <li><router-link :to="{path: '/post'}">文章</router-link></li>
            <li><router-link :to="{name: 'post', path: '/post', query: {title: 'about'}, params: {name: 'about.md'}}">关于</router-link></li>
        </ul>
    </div>
</template>
<style scoped lang="scss">
    ul {
        margin-left: 30%;
        li {
            width: 100px;
            text-align: center;
            float: left;
        }
    }
</style>