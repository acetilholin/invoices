export default {
    namespaced: true,
    state: {
        klavzule: []
    },
    mutations: {
        SET_KLAVZULE(state, payload) {
            state.klavzule = payload
        }
    },
    actions: {
        klavzuleAction({commit}) {
            axios.get('/klavzule')
                .then(response => {
                    commit('SET_KLAVZULE', response.data.klavzule)
                })
        }
    },
    getters: {
        getKlavzule(state) {
            return state.klavzule
        }
    }
}
