export default {
    namespaced: true,
    state: {
        data: [],
        interval: []
    },
    mutations: {
        SET_DATA(state, payload) {
            state.data = payload
        }
    },
    actions: {
        data({commit}) {
            axios.get('/visits')
                .then(response => {
                    commit('SET_DATA', response.data)
                })
        },
        interval({commit}, interval) {
            axios.post(`/interval`, {
                datefrom: interval.from,
                dateto: interval.to
            })
                .then(response => {
                    commit('SET_DATA', response.data)
                })
        }
    },
    getters: {
        getData(state) {
            return state.data
        }
    }
}
