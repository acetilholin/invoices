export default {
    namespaced: true,
    state: {
        customers: [],
        currentCustomer: [],
        customerTotalInvoices: [],
        customerTotalFinal: []
    },
    mutations: {
        SET_CUSTOMERS(state, payload) {
            state.customers = payload
        },
        SET_CURRENT_CUSTOMER(state, payload) {
            state.currentCustomer = payload
        },
        SET_CUSTOMER_TOTAL_INVOICES(state, payload) {
            state.customerTotalInvoices = payload
        },
        SET_CUSTOMER_TOTAL_FINAL(state, payload) {
            state.customerTotalFinal = payload
        }
    },
    actions: {
        all({commit}) {
            axios.get('/customers')
                .then(response => {
                    commit('SET_CUSTOMERS', response.data.data)
                })
        },
        async remove({commit, dispatch}, id) {
            return await axios.delete(`/customers/${id}`)
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async create({commit, dispatch}, customer) {
            let newCustomer = {
                'naziv_partnerja': customer.company,
                'kraj_ulica': customer.street,
                'posta': customer.post.posta,
                'email': customer.email,
                'telefon': customer.telephone,
                'id_ddv': customer.id_ddv,
                'sklic_st': customer.sklic
            }
            return await axios.post('/customers', newCustomer)
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async edit({commit, dispatch}, customer) {
            let posta = typeof customer.posta.posta === 'undefined' ? customer.posta : customer.posta.posta
            return await axios.patch(`/customers/${customer.id}`, {
                'naziv_partnerja': customer.naziv_partnerja,
                'kraj_ulica': customer.kraj_ulica,
                'posta': posta,
                'email': customer.email,
                'telefon': customer.telefon,
                'id_ddv': customer.id_ddv,
                'sklic_st': customer.sklic_st
            })
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        total({commit}, id) {
            axios.get(`/customers/${id}`)
                .then((response) => {
                    commit('SET_CUSTOMER_TOTAL_INVOICES', response.data.invoices)
                    commit('SET_CUSTOMER_TOTAL_FINAL', response.data.final)
                })
        },
        show({commit}, id) {
            axios.get(`/customers/${id}/edit`)
                .then((response) => {
                    commit('SET_CURRENT_CUSTOMER', response.data.customer)
                })
        }
    },
    getters: {
        getCustomers(state) {
            return state.customers
        },
        getCustomer(state) {
            return state.currentCustomer
        },
        getCustomerTotalInvoices(state) {
            return state.customerTotalInvoices;
        },
        getCustomerTotalFinal(state) {
            return state.customerTotalFinal
        }
    }
}
