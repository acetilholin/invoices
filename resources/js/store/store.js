import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth";
import general from "./general";
import invoices from "./invoices";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        general,
        invoices
    }
})

export default store
