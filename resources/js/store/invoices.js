export default {
    namespaced: true,
    state: {
        invoices: [],
        invoice: [],
        items: []
    },
    mutations: {
        SET_INVOICES(state, payload) {
            state.invoices = payload
        },
        SET_INVOICE(state, payload) {
            state.invoice = payload
        },
        SET_ITEMS(state, payload) {
            state.items = payload
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
                    commit('SET_ITEMS', response.data.items)
                })
        },
        async update({commit}, invoice) {
            return await axios.patch(`/invoices/${invoice.id}`, {
                'sifra_predracuna': invoice.invoice.sifra_predracuna,
                'ime_priimek': invoice.invoice.ime_priimek,
                'customer_id': invoice.invoice.customer_id,
                'timestamp': invoice.invoice.timestamp,
                'expiration': invoice.invoice.expiration,
                'klavzula': invoice.invoice.klavzula,
                'author': invoice.invoice.author,
                'work_date': invoice.invoice.work_date,
                'total': invoice.invoice.total,
                'quantity': invoice.invoice.quantity,
                'vat': invoice.invoice.vat,
                'items': invoice.items
            })
                .then((response) => {

                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        }
    },
    getters: {
        getInvoices(state) {
            return state.invoices
        },
        getInvoice(state) {
            return state.invoice
        },
        getItems(state) {
            return state.items
        }
    }
}
