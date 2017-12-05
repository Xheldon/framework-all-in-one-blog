<template>
    <div>
        <div v-html="md" id="markdown"></div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                md: ''
            }
        },
        mounted () {
            let query = document.location;
            if (query.hash.split('=')[1]) {
                let name = query.hash.split('=')[1];
                // TODO: 将异步 require 来的 js 放到单独的文件夹中
                import('src/common/md/'+name).then((md) => {
                    this.md = md;
                });
            }
        }
    }
</script>
<style lang="scss">
    /* 因为 markdown 为动态导入, 因此 markdown 中的内容如果加了 scoped 则不会被 styled(没有对应 hash 属性), 因此本 style 仅仅 #markdown 生效 */
    #markdown {
        padding: 0 20px;
    }
</style>