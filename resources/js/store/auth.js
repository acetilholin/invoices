export default {
    state: {
        token: null,
        user: null,
        auth_error: null
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload
        },
        SET_USER(state, payload) {
            state.user = payload
        },
    },
    actions: {
        async login({dispatch}, credentials) {
            await axios.post('/login', credentials)
                .then((response) => {
                    return dispatch('loginAttempt', response.data.access_token)
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async loginAttempt({commit, state}, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }

            if (!state.token) {
                return
            }

            try {
                let response = await axios.get('/me')
                commit('SET_USER', response.data)
            } catch (e) {
                commit('SET_USER', null)
                commit('SET_TOKEN', null)
            }

        },
        async register({context}, credentials) {
            let newUser = {
                'email': credentials.email,
                'username': credentials.username,
                'password': credentials.password,
                'password_confirmation': credentials.password_confirmation
            }
            return await axios.post('/register', newUser)
                .then((response) => {
                    return response.data
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async resetEmail({context}, email) {
            return await axios.post('/token', {
                email
            })
                .then(response => {
                    return response.data
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async changePassword({context}, payload) {
            let passwordData = {
                'email': payload.email,
                'token': payload.token,
                'password': payload.password,
                'password_confirmation': payload.password_confirmation
            }
            return await axios.post('/reset', passwordData)
              .then(response => {
                  return response.data
              })
              .catch((e) => {
                  throw (e.response.data.error);
              })
        },
        logout({commit}) {
            return axios.post('/logout')
                .then(() => {
                    commit('SET_TOKEN', null)
                    commit('SET_USER', null)
                })
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        authenticated(state) {
            return !!(state.token && state.user)
        },
    }
}
