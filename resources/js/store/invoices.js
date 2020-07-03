export default {
    namespaced: true,
    state: {
        invoices: []
    },
    mutations: {
        SET_INVOICES(state, payload) {
            state.invoices = payload
        }
    },
    actions: {
        invoicesAction({commit}) {
            axios.get('/invoices')
                .then((response) => {
                    commit('SET_INVOICES', response.data.data)
                })
        }
    },
    getters: {
        getInvoices(state) {
            return state.invoices
        }
    }
}
