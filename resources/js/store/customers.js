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
        customersAction({commit}) {
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
        }
    },
    getters: {
        getCustomers(state) {
            return state.customers
        }
    }
}
