export default {
    namespaced: true,
    state: {
        drawer: true,
        persistent: false,
        editDialog: false,
        editInvoiceDialog: false,
        addItemDialog: false,
        addRecipient: false,
        editRecipient: false,
        addNewRecipient: false
    },
    mutations: {
        CHANGE_DRAWER(state, payload) {
            state.drawer = payload
        },
        CHANGE_DIALOG(state, payload) {
            state.persistent = payload
        },
        CHANGE_EDIT_DIALOG(state, payload) {
            state.editDialog = payload
        },
        CHANGE_EDIT_INVOICE_DIALOG(state, payload) {
            state.editInvoiceDialog = payload
        },
        CHANGE_ADD_ITEM_DIALOG(state, payload) {
            state.addItemDialog = payload
        },
        CHANGE_ADD_RECIPIENT_DIALOG(state, payload) {
            state.addRecipient = payload
        },
        CHANGE_EDIT_RECIPIENT_DIALOG(state, payload) {
            state.editRecipient = payload
        },
        ADD_NEW_RECIPIENT_DIALOG(state, payload) {
            state.addNewRecipient = payload
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
        },
        addItemDialog({commit}, modal) {
            commit('CHANGE_ADD_ITEM_DIALOG', modal)
        },
        AddRecipientDialog({commit}, modal) {
            commit('CHANGE_ADD_RECIPIENT_DIALOG', modal)
        },
        editRecipientDialog({commit}, modal) {
            commit('CHANGE_EDIT_RECIPIENT_DIALOG',modal)
        },
        AddNewRecipientDialog({commit}, modal) {
            commit('ADD_NEW_RECIPIENT_DIALOG', modal)
        }
    },
    getters: {
        getDrawer(state) {
            return state.drawer
        },
        getDialog(state) {
            return state.persistent
        },
        getEditDialog(state) {
            return state.editDialog
        },
        getEditInvoiceDialog(state) {
            return state.editInvoiceDialog
        },
        getAddItemDialog(state) {
            return state.addItemDialog
        },
        getAddRecipientDialog(state) {
            return state.addRecipient
        },
        getEditRecipientDialog(state) {
            return state.editRecipient
        },
        getAddNewRecipient(state) {
            return state.addNewRecipient
        }
    }
}
