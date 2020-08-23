export default {
    namespaced: true,
    state: {
        company: []
    },
    mutations: {
        SET_COMPANY(state, payload) {
            state.company = payload
        }
    },
    actions: {
        all({commit}) {
            axios.get('/companies')
                .then(response => {
                    commit('SET_COMPANY', response.data.company)
                })
        },
        async update({dispatch}, company) {
            let cid = 1
            return await axios.patch(`/companies/${cid}`, {company})
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
        getCompany(state) {
            return state.company
        }
    }
}
