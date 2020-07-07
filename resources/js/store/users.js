export default {
    namespaced: true,
    state: {
        users: []
    },
    mutations: {
        SET_USERS(state, payload) {
            state.users = payload
        }
    },
    actions: {
        usersAction({commit}) {
            axios.get('/users')
                .then(response => {
                    commit('SET_USERS', response.data.data)
                })
        },
        async addUser({commit}, user) {
            return await axios.post('/users', user)
                .then(response => {
                    commit('SET_USERS', response.data.users)
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async changeSingleDetail({commit}, details) {
            return await axios.get(`users/${details.id}/edit/${details.attr}/${details.data}`)
                .then((response) => {
                    commit('SET_USERS', response.data.users)
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        }
    },
    getters: {
        getUsers(state) {
            return state.users
        }
    }
}
