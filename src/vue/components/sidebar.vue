<template>
    <div>
        <div id="beyond-logo"></div>
        <a href="http://www.xheldon.com" id="logo" alt="点我, 你是不是喜欢我?" title="点我, 你是不是喜欢我?">
            <img src="http://img.xheldon.com/img/logo_min.png" alt="点我, 你是不是喜欢我?">
        </a>
    </div>
</template>
<style scoped lang="scss">
    #beyond-logo {
        background: #4fc08d;
        height: 40px;
        position: fixed;
        top: 0;
        width: 30%;
        z-index: 9999;
    }
    #logo {
        display: block;
        width: 50%;
        margin-top: 50%;
        margin-left: 50%;
        border-radius: 50%;
        overflow: hidden;
        transform: translateX(-50%) translateY(-50%);
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
</style>