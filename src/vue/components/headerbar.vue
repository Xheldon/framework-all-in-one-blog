<template>
    <div>
        <ul>
            <li><router-link :to="{path: '/'}">首页</router-link></li>
            <li><router-link :to="{path: '/post'}">文章</router-link></li>
            <li><router-link :to="{path: '/about'}">关于</router-link></li>
        </ul>
    </div>
</template>
