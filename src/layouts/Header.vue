<template>
    <div class="header">
        <button v-button="'default'" @click="logOut">Log Out</button>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        logOut() {
            this.$root.loggedIn = false;
            localStorage.removeItem('token');
            this.$router.push('login');
        }
    }
}
</script>

<style scoped lang="scss">
    .header {
        background-color: #fff;
        box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);
        padding: 0 15px;
        height: 64px;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

</style>
