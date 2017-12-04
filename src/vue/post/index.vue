<template>
    <div>
        {{data}}
        <div v-html="md" id="markdown"></div>
        {{fs}}
    </div>
</template>
<script>
    import md from 'src/common/md/markdown.md';
    import fs from 'fs';
    export default {
        data () {
            return {
                data: '这个是文章页',
                md,
                fs
            }
        }
    }
</script>