export default {
    namespaced: true,
    state: {
        drawer: true
    },
    mutations: {
        CHANGE_DRAWER(state, payload) {
            state.drawer = payload
        }
    },
    actions: {
        drawerAction({commit}, drawerState) {
            commit('CHANGE_DRAWER', drawerState)
        }
    },
    getters: {
        getDrawer(state) {
            return state.drawer
        }
    }
}
