export default {
    namespaced: true,
    state: {
        finalAll: [],
        final: [],
        items: [],
        customer: [],
        recipient: [],
        klavzula: [],
        report: []
    },
    mutations: {
        SET_FINAL_INVOICES(state, payload) {
            state.finalAll = payload
        },
        SET_FINAL_INVOICE(state, payload) {
            state.final = payload
        },
        SET_ITEMS(state, payload) {
            state.items = payload
        },
        SET_INVOICE_CUSTOMER(state, payload) {
            state.customer = payload
        },
        SET_RECIPIENT(state, payload) {
            state.recipient = payload
        },
        SET_KLAVZULA(state, payload) {
            state.klavzula = payload
        },
        SET_REPORT(state, payload) {
            state.report = payload
        }
    },
    actions: {
        all({commit}) {
            axios.get('/finalInvoices')
                .then((response) => {
                    commit('SET_FINAL_INVOICES', response.data.data)
                })
        },
        view({commit}, id) {
            axios.get(`/finalInvoices/${id}`)
                .then((response) => {
                    commit('SET_FINAL_INVOICE', response.data.invoice)
                    commit('SET_ITEMS', response.data.items)
                    commit('SET_INVOICE_CUSTOMER', response.data.customer)
                    commit('SET_RECIPIENT', response.data.recipient)
                    commit('SET_KLAVZULA', response.data.klavzula)
                })
        },
        async remove({dispatch}, id) {
            return await axios.delete(`/finalInvoices/${id}`)
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        report({commit}, interval) {
            axios.post('finalInvoice/report', {
                from: interval.from,
                to: interval.to
            })
                .then((response) => {
                    commit('SET_REPORT', response.data)
                })
        },
        filterByInterval({commit}, interval) {
            axios.post('finalInvoice/interval', {
                from: interval.from,
                to: interval.to
            })
                .then((response) => {
                    commit('SET_FINAL_INVOICES', response.data.finalInvoices)
                })
        }
    },
    getters: {
        getAll(state) {
            return state.finalAll
        },
        getFinalInvoice(state) {
            return state.final
        },
        getItems(state) {
            return state.items
        },
        getCustomer(state) {
            return state.customer
        },
        getRecipient(state) {
            return state.recipient
        },
        getKlavzula(state) {
            return state.klavzula
        },
        getReport(state) {
            return state.report
        }
    }
}
