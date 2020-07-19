export default {
    namespaced: true,
    state: {
        drawer: true,
        persistent: false,
        posts: []
    },
    mutations: {
        CHANGE_DRAWER(state, payload) {
            state.drawer = payload
        },
        CHANGE_DIALOG(state, payload) {
            state.persistent = payload
        },
        SET_POSTS(state, payload) {
            state.posts = payload
        }
    },
    actions: {
        drawerAction({commit}, drawerState) {
            commit('CHANGE_DRAWER', drawerState)
        },
        modalAction({commit}, dialogState) {
            commit('CHANGE_DIALOG', dialogState)
        },
        async postAction({commit}) {
            axios.get('/posts')
                .then(response => {
                   commit('SET_POSTS', response.data.posts)
                })
        }
    },
    getters: {
        getDrawer(state) {
            return state.drawer
        },
        getDialog(state) {
            return state.persistent
        },
        getPosts(state) {
            return state.posts
        }
    }
}
