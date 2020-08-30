import Vue from 'vue'
import Quasar from 'quasar'
import App from "./main/App";
import router from "./routes/routes";
import store from "./store/store";
import i18n  from './trans/translations'
import axios from 'axios'
import VueAxios from 'vue-axios'
import langSl from 'quasar/lang/sl'
import VueHtmlToPaper from 'vue-html-to-paper';
import VueCharts from 'vue-chartjs'

require('./store/subscriber')
require('./bootstrap');

Vue.use(Quasar, {
    lang: langSl
})

const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        '/css/invoice.css'
    ]
}
Vue.use(VueHtmlToPaper, options);

Vue.use(VueCharts)

Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'));

window.Vue = require('vue');

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/auth'

Vue.config.silent = false; /* Suppress all Vue logs and warnings */
Vue.config.productionTip = false /* development mode notice */

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
            i18n,
            router,
            store,
            components: {
                App
            }
        });
    })
