export default {
    namespaced: true,
    state: {
        data: [],
        interval: [],
        total: []
    },
    mutations: {
        SET_DATA(state, payload) {
            state.data = payload
        },
        SET_TOTAL(state, payload) {
            state.total = payload
        }
    },
    actions: {
        visits({commit}) {
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
        },
        total({commit}) {
            axios.get('total')
                .then(response => {
                    commit('SET_TOTAL', response.data)
                })
        }
    },
    getters: {
        getData(state) {
            return state.data
        },
        getTotal(state) {
            return state.total
        }
    }
}
