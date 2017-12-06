<template>
    <div>
        <ul>
            <li v-for="(item, name) in list">
                <router-link
                        v-if="item[0] === 'post'"
                        :to="{name: 'post',path: '/post', query: {title: item[3]}, params: {name: name}}">{{item[1]}}</router-link>
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