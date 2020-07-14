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
        },
        async removeUser({commit}, id) {
            return await axios.delete(`/users/${id}`)
                .then((response) => {
                    commit('SET_USERS', response.data.users)
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async changePassword({commit}, details) {
            return await axios.post(`/users/edit/password`, details)
                .then((response) => {
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async changeImage({commit}, photoData) {
            const fData = new FormData()
            fData.append('file', photoData.file)
            fData.append('id', photoData.id)
            return await axios.post('/users/photo', fData, {headers: {'Content-Type': 'multipart/form-data'}})
                .then((response) => {
                    let user = response.data.user
                    commit('auth/SET_USER', user, {root: true})
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
