export default {
    namespaced: true,
    state: {
        months: [],
        monthData: []
    },
    mutations: {
        SET_MONTHS(state, payload) {
            state.months = payload
        },
        SET_MONTH_DATA(state, payload) {
            state.monthData = payload
        },
        REMOVE_DAY_FROM_MONTH(state, payload) {
            state.monthData.days = state.monthData.days.filter(item => {
                return item !== payload
            })
        },
        ADD_DAY_TO_MONTH(state, payload) {
            state.monthData.days.push(payload)
        }
    },
    actions: {
        all({commit}) {
            axios.get('/months')
                .then(response => {
                    commit('SET_MONTHS', response.data.data)
                })
        },
        async create({commit, dispatch}, report) {
            let days = Object.keys(report.days).length === 0 ? null : report.days
            return await axios.post('/months', {
                days: days,
                report: report.report
            })
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async copy({dispatch}, id) {
            return await axios.get(`/months/${id}/copy`)
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
        },
        async update({commit, dispatch}, monthData) {
            return await axios.patch(`/months/${monthData.id}`, {
                'days': monthData.days,
                'month': monthData.month,
                'employee_id': monthData.employee_id
            })
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        addDay({commit}, day) {
            commit('ADD_DAY_TO_MONTH', day)
        },
        removeDay({commit}, id) {
            axios.delete(`/days/${id}`)
        },
        removeDayFromMonth({commit, dispatch}, item) {
            commit('REMOVE_DAY_FROM_MONTH', item)
            dispatch('all')
        },
        async edit({commit}, id) {
            await axios.get(`/months/${id}/edit`)
                .then(response => {
                    commit('SET_MONTH_DATA', response.data)
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        filterById({commit}, id) {
            axios.get(`/months/filter/${id}`)
                .then((response) => {
                    commit('SET_MONTHS', response.data.data)
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        filterByInterval({commit}, interval) {
            axios.post('/months/interval', {
                from: interval.from,
                to: interval.to,
                employee_id: interval.employee_id
            })
                .then((response) => {
                    commit('SET_MONTHS', response.data.data)
                })
        },
        remove({dispatch}, id) {
            return axios.delete(`/months/${id}`)
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
        getMonths(state) {
            return state.months
        },
        getMonthData(state) {
            return state.monthData
        }
    }
}
