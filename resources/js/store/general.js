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
        addNewRecipient: false,
        customerTotal: false,
        printInvoice: false,
        printFinal: false,
        company: false,
        klavzule: false,
        editKlavzula: false,
        reportDialog: false,
        customerReportDialog: false
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
        },
        CHANGE_CUSTOMER_TOTAL_DIALOG(state, payload) {
            state.customerTotal = payload
        },
        CHANGE_PRINT_INVOICE_DIALOG(state, payload) {
            state.printInvoice = payload
        },
        CHANGE_COMPANY(state, payload) {
            state.company = payload
        },
        CHANGE_KLAVZULE(state, payload) {
            state.klavzule = payload
        },
        CHANGE_EDIT_KLAVZULA_DIALOG(state, payload) {
            state.editKlavzula = payload
        },
        CHANGE_PRINT_FINAL_INVOICE_DIALOG(state, payload) {
            state.printFinal = payload
        },
        CHANGE_REPORT_DIALOG(state, payload) {
            state.reportDialog = payload
        },
        CHANGE_CUSTOMER_REPORT_DIALOG(state, payload) {
            state.customerReportDialog = payload
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
            commit('CHANGE_EDIT_RECIPIENT_DIALOG', modal)
        },
        AddNewRecipientDialog({commit}, modal) {
            commit('ADD_NEW_RECIPIENT_DIALOG', modal)
        },
        customerTotalDialog({commit}, modal) {
            commit('CHANGE_CUSTOMER_TOTAL_DIALOG', modal)
        },
        printInvoiceDialog({commit}, modal) {
            commit('CHANGE_PRINT_INVOICE_DIALOG', modal)
        },
        settings({commit}) {
            axios.get('/settings')
                .then((response) => {
                    commit('CHANGE_COMPANY', !!response.data.company.visible)
                    commit('CHANGE_KLAVZULE', !!response.data.klavzule.visible)
                })
        },
        changeSetting({commit, dispatch}, settings) {
            return axios.post(`/setting/update`, {
                visible: settings.status,
                data: settings.setting
            })
                .then((response) => {
                    dispatch('settings')
                    return response.data.success
                })
        },
        editKlavzulaDialog({commit}, modal) {
            commit('CHANGE_EDIT_KLAVZULA_DIALOG', modal)
        },
        printFinalInvoiceDialog({commit}, modal) {
            commit('CHANGE_PRINT_FINAL_INVOICE_DIALOG', modal)
        },
        reportDialog({commit}, modal) {
            commit('CHANGE_REPORT_DIALOG', modal)
        },
        customerReportDialog({commit}, modal) {
            commit('CHANGE_CUSTOMER_REPORT_DIALOG', modal)
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
        },
        getCustomerTotalDialog(state) {
            return state.customerTotal
        },
        getPrintInvoiceDialog(state) {
            return state.printInvoice
        },
        getCompany(state) {
            return state.company
        },
        getKlavzule(state) {
            return state.klavzule
        },
        getEditKlavzulaDialog(state) {
            return state.editKlavzula
        },
        getPrintFinal(state) {
            return state.printFinal
        },
        getReportDialog(state) {
            return state.reportDialog
        },
        getCustomerReportDialog(state) {
            return state.customerReportDialog
        }
    }
}
