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
                .then((response) => {
                    commit('SET_USERS', response.data.data)
                })
        },
        async addUser({context}, user) {
            return await axios.post('/users', user)
                .then(response => {
                    return response.data
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
