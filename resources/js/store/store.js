import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth";

Vue.use(Vuex)

const store = new Vuex.Store({
    namespaced: true,
    modules: {
        auth
    }
})

export default store
