<template>
    <div>
        <div v-html="md" id="markdown"></div>
    </div>
</template>
<script>
    let fileListObj = require('src/common/md/post-list');

    export default {
        data () {
            return {
                md: '',
                name: this.$route.params.name
            }
        },
        mounted () {
            if (Object.keys(fileListObj).includes(this.name)) {
                import('src/common/md/' + fileListObj[this.name][3]).then((md) => {
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