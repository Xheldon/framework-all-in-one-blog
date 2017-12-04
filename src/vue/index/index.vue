<template>
    <div>
        {{data}}
        <ul>
            <li v-for="item in list">
                <router-link :to="{path: '/post', query: {title: item}}">{{item}}</router-link>
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