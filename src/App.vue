<template>
    <div id="app">
        <app-header v-if="$root.loggedIn"></app-header>
        <router-view/>
    </div>
</template>

<script>
import Header from './layouts/Header.vue';

export default {
    name: 'App',
    components: {
        'app-header': Header
    },
    created() {
        this.$root.loggedIn = !!localStorage.getItem('token');
    }
}
</script>

<style lang="scss">
    @import "styles/styles";
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
    }
</style>
