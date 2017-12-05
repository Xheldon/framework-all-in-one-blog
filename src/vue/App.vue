<template>
    <div id="main">
        <header-bar id="header-bar"></header-bar>
        <div id="content">
            <side-bar id="side-bar"></side-bar>
            <router-view id="router-view"></router-view>
        </div>
    </div>
</template>
<script>
    import sideBar from './components/sidebar.vue';
    import headerBar from './components/headerbar.vue'

    export default {
        components: {
            sideBar,
            headerBar
        }
    }
</script>
<style lang="scss">
    /*#main {*/
        /*max-width: 1200px;*/
    /*}*/

    #header-bar {
        position: fixed;
        z-index: 999;
        top: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background-color: rgb(54, 73, 95);
    }

    #content {
        width: 100%;
        max-width: 1200px;
        position: relative;
        margin: 100px auto 0;
        bottom: 0;
        top: 0;
        #side-bar {
            width: 30%;
            float: left;
            z-index: 999;
            position: fixed;
            padding-top: 40px;
            background-color: #f6f6f6;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
        #router-view {
            width: 70%;
            float: right;
        }
    }
</style>