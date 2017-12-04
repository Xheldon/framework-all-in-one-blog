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
<style lang="scss" scoped>

    #header-bar {
        position: fixed;
        top: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background-color: darkgreen;
    }

    #content {
        width: 100%;
        margin-top: 40px;
        position: absolute;
        bottom: 0;
        top: 0;
        #side-bar {
            width: 30%;
            float: left;
            position: absolute;
            background-color: dimgray;
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