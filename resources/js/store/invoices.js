export default {
    namespaced: true,
    state: {
        invoices: [],
        invoice: []
    },
    mutations: {
        SET_INVOICES(state, payload) {
            state.invoices = payload
        },
        SET_INVOICE(state, payload) {
            state.invoice = payload
        }
    },
    actions: {
        invoicesAction({commit}) {
            axios.get('/invoices')
                .then((response) => {
                    commit('SET_INVOICES', response.data.data)
                })
        },
        currentInvoiceAction({commit}, id) {
            axios.get(`/invoices/${id}/edit`)
                .then((response) => {
                    commit('SET_INVOICE', response.data.invoice)
                })
        }
    },
    getters: {
        getInvoices(state) {
            return state.invoices
        },
        getInvoice(state) {
            return state.invoice
        }
    }
}
