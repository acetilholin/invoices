export default {
    namespaced: true,
    state: {
        posts: []
    },
    mutations: {
        SET_POSTS(state, payload) {
            state.posts = payload
        }
    },
    actions: {
        async postAction({commit}) {
            axios.get('/posts')
                .then(response => {
                    commit('SET_POSTS', response.data.posts)
                })
        }
    },
    getters: {
        getPosts(state) {
            return state.posts
        }
    }
}
