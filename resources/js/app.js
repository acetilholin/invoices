import Vue from 'vue'
import Quasar from 'quasar'
import App from "./main/App";
import router from "./routes/routes";
import store from "./store/store";


require('./bootstrap');

Vue.use(Quasar)
Quasar.lang.set(Quasar.lang.sl)

window.Vue = require('vue');

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    }
});
