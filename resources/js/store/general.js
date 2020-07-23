export default {
    namespaced: true,
    state: {
        drawer: true,
        persistent: false,
        editModal: false,
        editInvoiceModal: false
    },
    mutations: {
        CHANGE_DRAWER(state, payload) {
            state.drawer = payload
        },
        CHANGE_DIALOG(state, payload) {
            state.persistent = payload
        },
        CHANGE_EDIT_DIALOG(state, payload) {
            state.editModal = payload
        },
        CHANGE_EDIT_INVOICE_DIALOG(state, payload) {
            state.editInvoiceModal = payload
        }
    },
    actions: {
        drawerAction({commit}, drawerState) {
            commit('CHANGE_DRAWER', drawerState)
        },
        modalAction({commit}, dialogState) {
            commit('CHANGE_DIALOG', dialogState)
        },
        editCustomerModal({commit}, modal) {
            commit('CHANGE_EDIT_DIALOG', modal)
        },
        editInvoiceDialogAction({commit}, modal) {
            commit('CHANGE_EDIT_INVOICE_DIALOG', modal)
        }
    },
    getters: {
        getDrawer(state) {
            return state.drawer
        },
        getDialog(state) {
            return state.persistent
        },
        getEditModal(state) {
            return state.editModal
        },
        getEditInvoiceModal(state) {
            return state.editInvoiceModal
        }
    }
}
