<template>
    <div class="liner-loading-container">
        <div class="line-loader"></div>
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>
<style scoped lang="scss">
    .liner-loading-container {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 999999999;
    }

    .line-loader {
        height: 2px;
        width: 100%;
        overflow: hidden;
        background-color: rgba($primary-green, 0.22);
        position: absolute;
    }
    .line-loader:before{
        display: block;
        position: absolute;
        content: "";
        left: -200px;
        width: 200px;
        height: 2px;
        background-color: $primary-green;
        animation: line-loader 2.5s linear infinite;
    }

    @keyframes line-loader {
        from {left: -100%; width: 100%;}
        50% {width: 100%;}
        70% {width: 100%;}
        80% { left: 50%;}
        95% {left: 120%;}
        to {left: 100%;}
    }

</style>
