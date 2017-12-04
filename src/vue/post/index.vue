<template>
    <div>
        {{data}}
        <div v-html="md" id="markdown"></div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                data: '这个是文章页',
                md: ''
            }
        },
        mounted () {
            let query = document.location;
            if (query.hash.split('=')[1]) {
                let name = query.hash.split('=')[1];
                import('src/common/md/'+name).then((md) => {
                    this.md = md;
                });
            }
        }
    }
</script>