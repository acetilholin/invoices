export default {
    namespaced: true,
    state: {
        klavzule: [],
        currentKlavzula: []
    },
    mutations: {
        SET_KLAVZULE(state, payload) {
            state.klavzule = payload
        },
        SET_CURRENT_KLAVZULA(state, payload) {
            state.currentKlavzula = payload
        }
    },
    actions: {
        all({commit}) {
            axios.get('/klavzulas')
                .then(response => {
                    commit('SET_KLAVZULE', response.data.klavzule)
                })
        },
        async create({commit, dispatch}, klavzula) {
            return await axios.post('/klavzulas', {
                short_name: klavzula.shortName,
                description: klavzula.description
            })
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        show({commit}, id) {
            axios.get(`/klavzulas/${id}/edit`)
                .then((response) => {
                    commit('SET_CURRENT_KLAVZULA', response.data.klavzula)
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        remove({commit, dispatch}, id) {
            return axios.delete(`/klavzulas/${id}`)
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async edit({commit, dispatch}, klavzula) {
            return await axios.patch(`/klavzulas/${klavzula.id}`, {
                'short_name': klavzula.short_name,
                'description': klavzula.description,
            })
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
        getKlavzule(state) {
            return state.klavzule
        },
        getKlavzula(state) {
            return state.currentKlavzula
        }
    }
}
