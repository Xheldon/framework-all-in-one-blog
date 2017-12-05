<template>
    <div>
        <div v-html="md" id="markdown"></div>
    </div>
</template>
<script>
    import fileListObj from 'src/common/md/post-list';

    export default {
        data () {
            return {
                md: '',
                title: this.$route.query.title
            }
        },
        mounted () {
            if (this.title) {
                import('src/common/md/' + this.title).then((md) => {
                    this.md = md;
                });
            }
        }
    }
</script>
<style lang="scss">
    /* 因为 markdown 为动态导入, 因此 #markdown 中的内容如果加了 scoped 则不会被 styled(没有对应 hash 属性), 因此本 style 仅仅 #markdown 生效 */
    #markdown {
        padding: 0 20px;
    }
</style>