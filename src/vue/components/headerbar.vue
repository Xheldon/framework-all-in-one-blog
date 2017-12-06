<template>
    <div>
        <ul>
            <li><router-link :to="{name: 'home'}">首页</router-link></li>
            <li><router-link :to="{name: 'post', params: {name: 'about.html'}}">关于</router-link></li>
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