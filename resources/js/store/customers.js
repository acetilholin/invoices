export default {
    namespaced: true,
    state: {
        customers: []
    },
    mutations: {
        SET_CUSTOMERS(state, payload) {
            state.customers = payload
        }
    },
    actions: {
        all({commit}) {
            axios.get('/customers')
                .then(response => {
                    commit('SET_CUSTOMERS', response.data.data)
                })
        },
        async remove({commit}, id) {
            return await axios.delete(`/customers/${id}`)
                .then((response) => {
                    commit('SET_CUSTOMERS', response.data.customers)
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async create({commit}, customer) {
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
                    commit('SET_CUSTOMERS', response.data.customers)
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        }
    },
    getters: {
        getCustomers(state) {
            return state.customers
        }
    }
}
