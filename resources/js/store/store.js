import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth";
import general from "./general";
import invoices from "./invoices";
import users from "./users";
import customers from "./customers";
import post from "./post";
import klavzule from "./klavzule";
import final from "./final";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        general,
        invoices,
        users,
        customers,
        post,
        klavzule,
        final
    }
})

export default store
