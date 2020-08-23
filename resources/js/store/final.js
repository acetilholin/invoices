export default {
    namespaced: true,
    state: {
        final: []
    },
    mutations: {
        SET_FINAL_INVOICES(state, payload) {
            state.final = payload
        }
    },
    actions: {
        all({commit}) {
            axios.get('/finalInvoices')
                .then((response) => {
                    commit('SET_FINAL_INVOICES', response.data.data)
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
        filterByInterval({commit}, interval) {
            axios.post('finalInvoice/interval', {
                from: interval.from,
                to: interval.to
            })
                .then((response) => {
                    commit('SET_FINAL_INVOICES', response.data.finalInvoices)
                })
        },
        update({dispatch}, id) {
            return axios.patch(`/finalInvoices/${id}`)
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        }
    },
    getters: {
        getAll(state) {
            return state.final
        }
    }
}
