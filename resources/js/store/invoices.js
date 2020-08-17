export default {
    namespaced: true,
    state: {
        invoices: [],
        invoice: [],
        items: [],
        recipient: []
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
        },
        SET_RECIPIENT(state, payload) {
            state.recipient = payload
        },
        ADD_TO_ITEMS(state, payload) {
            state.items.push(payload)
        },
        REMOVE_FROM_ITEMS(state, payload) {
            state.items = state.items.filter(item => {
                return item !== payload
            })
        }
    },
    actions: {
        allInvoices({commit}) {
            axios.get('/invoices')
                .then((response) => {
                    commit('SET_INVOICES', response.data.data)
                })
        },
        addItem({commit}, item) {
            commit('ADD_TO_ITEMS', item)
        },
        removeItemFromInvoice({commit, dispatch}, item) {
            commit('REMOVE_FROM_ITEMS', item)
            dispatch('allInvoices')
        },
        removeItem({commit}, id) {
            axios.delete(`/items/${id}`)
        },
        currentInvoiceAction({commit}, id) {
            axios.get(`/invoices/${id}/edit`)
                .then((response) => {
                    commit('SET_INVOICE', response.data.invoice)
                    commit('SET_ITEMS', response.data.items)
                    commit('SET_RECIPIENT', response.data.recipient)
                })
        },
        async update({commit, dispatch}, invoice) {
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
                    dispatch('allInvoices')
                    commit('SET_ITEMS', response.data.items)
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async addRecipient({commit}, recipientData) {
            let newRecipient = {
                invoice_id: recipientData.id,
                title: recipientData.recipient.title,
                street: recipientData.recipient.street,
                posta: recipientData.recipient.posta.posta
            }
            return await axios.post('/recipients', newRecipient)
                .then((response) => {
                    commit('SET_RECIPIENT', response.data.recipient)
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        filterByInterval({commit}, interval) {
            axios.post('invoice/interval', {
                from: interval.from,
                to: interval.to
            })
                .then((response) => {
                    commit('SET_INVOICES', response.data.invoices)
                })
        },
        async create({commit, dispatch}, newInvoice) {
            let items = Object.keys(newInvoice.items).length === 0 ? null : newInvoice.items
            let recipient = Object.keys(newInvoice.recipient).length === 0 ? null : newInvoice.recipient
            return await axios.post('/invoices', {
                invoice: newInvoice.invoice,
                items: items,
                recipient: recipient
            })
                .then((response) => {
                    dispatch('allInvoices')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async removeRecipient({commit}, id) {
            return await axios.delete(`/recipients/${id}`)
                .then((response) => {
                    commit('SET_RECIPIENT', null)
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async EditRecipient({commit}, recipient) {
            return await axios.patch(`/recipients/${recipient.id}`, {
                'id': recipient.id,
                'title': recipient.title,
                'street': recipient.street,
                'posta': recipient.posta
            })
                .then((response) => {
                    commit('SET_RECIPIENT', response.data.recipient)
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async remove({commit, dispatch}, id) {
            return await axios.delete(`/invoices/${id}`)
                .then((response) => {
                    dispatch('allInvoices')
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
        },
        getRecipient(state) {
            return state.recipient
        }
    }
}
