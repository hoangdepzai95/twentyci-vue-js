import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './shared';

Vue.config.productionTip = false

new Vue({
    data: () => {
        return {
            loggedIn: false
        }
    },
    router,
    render: h => h(App)
}).$mount('#app')
