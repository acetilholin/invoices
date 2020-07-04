import Vue from 'vue'
import Quasar from 'quasar'
import App from "./main/App";
import router from "./routes/routes";
import store from "./store/store";
import axios from 'axios'
import VueAxios from 'vue-axios'


require('./store/subscriber')
require('./bootstrap');

Vue.use(Quasar)
Vue.use(VueAxios, axios)
Quasar.lang.set(Quasar.lang.sl)
Vue.use(require('vue-moment'));

window.Vue = require('vue');

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/auth'

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const authenticated = store.getters["auth/authenticated"]

    if (requiresAuth && !authenticated) {
        next('/login-register')
    } else if (to.path === '/login-register' && authenticated) {
        next('/')
    } else {
        next()
    }
})

store.dispatch('auth/loginAttempt', localStorage.getItem('token'))
    .then(() => {
        const app = new Vue({
            el: '#app',
            router,
            store,
            components: {
                App
            }
        });
    })
