<template>
    <div>
        <ul>
            <li v-for="(name, link) in list">
                <router-link :to="{path: '/post', query: {title: link}}">{{name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import markDownList from 'src/common/md/post-list';
    export default {
        data () {
            return {
                data: '这个是首页列表',
                list: markDownList
            }
        }
    }
</script>
<style scoped lang="scss">
    ul{
        padding: 0 20px;
    }
</style>