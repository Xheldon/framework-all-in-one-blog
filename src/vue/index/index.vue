<template>
    <div>
        <ul>
            <li v-for="(item, name, index) in list" v-if="item[0] === 'post'">
                {{index + 1}}. <router-link
                        :to="{name: 'post', params: {name: name}}">{{item[1]}}</router-link>  » <i><span>{{item[2]}}</span></i>
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