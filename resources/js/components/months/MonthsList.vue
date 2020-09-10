<template>
    <div class="q-pa-md">
        <create-month class="q-mt-sm q-mb-md"></create-month>

        <q-btn color="amber" class="q-mb-md" outline icon="person" @click="showEmployees()" label="Zaposleni" />
        <filter-dates @interval="filterData"></filter-dates>
        <q-table
            title="Mesečni izpisi ur"
            :data="months"
            :columns="columns"
            row-key="name"
            :loading="loading"
            :filter="filter"
        >
            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Išči">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        {{ tableIndex(props.row) }}
                    </q-td>
                    <q-td key="employee" :props="props">
                        {{ props.row.employee }}
                    </q-td>
                    <q-td key="date" :props="props">
                        {{ props.row.date | moment('MMMM') }}
                    </q-td>
                    <q-td key="edit" :props="props">
                        <q-btn-dropdown color="primary" outline icon="settings">
                            <q-list>
                                <q-item clickable v-close-popup @click="editMonth(props.row.id)">
                                    <q-item-section class="text-center">
                                        <q-item-label><q-icon name="create" class="pointer text-black action-icon"></q-icon> {{ $t("general.edit") }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="copyMonth(props.row.id)">
                                    <q-item-section class="text-center">
                                        <q-item-label><q-icon name="content_copy" class="pointer text-black action-icon"></q-icon> {{ $t("general.copy") }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="viewMonth(props.row.id)">
                                    <q-item-section class="text-center">
                                        <q-item-label><q-icon name="pageview" target="_blank" class="pointer text-black action-icon"></q-icon> {{ $t("general.view") }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="confirm(props.row.id)">
                                    <q-item-section class="text-center text-red">
                                        <q-item-label><q-icon name="delete_outline" class="pointer action-icon"></q-icon> {{ $t("general.delete") }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
        <edit-month></edit-month>
        <employee-dialog></employee-dialog>
        <create-month-dialog></create-month-dialog>
        <print-month></print-month>
    </div>
</template>

<script>

import CreateMonth from "./CreateMonth";
import {mapGetters, mapActions} from 'vuex'
import EmployeeDialog from "../employees/dialogs/EmployeeDialog";
import CreateMonthDialog from "./dialogs/CreateMonthDialog";
import EditMonth from "./dialogs/EditMonth";
import PrintMonth from "./dialogs/PrintMonth";
import FilterDates from "../invoices/filter/FilterDates";

export default {
    name: "MonthsList",
    data() {
        return {
            filter: '',
            loading:true,
            columns: [
                {
                    name: 'index',
                    label: '#',
                    align: 'center'
                },
                {
                    name: 'employee',
                    required: true,
                    label: 'Zaposleni',
                    align: 'center',
                    sortable: true,
                    field: row => row.employee,
                },
                {
                    name: 'date',
                    required: true,
                    label: 'Mesec',
                    align: 'center',
                    sortable: true,
                    field: row => row.date,
                },
                {name: 'edit', label: 'Uredi', align: 'center'}
            ]
        }
    },
    components: {
        FilterDates,
        PrintMonth,
        EditMonth,
        CreateMonthDialog,
        EmployeeDialog,
        CreateMonth
    },
    computed: {
      ...mapGetters({
        months: 'months/getMonths'
      })
    },
    methods: {
        ...mapActions({
            removeMonth: 'months/remove',
            copy: 'months/copy',
            filterByInterval: 'months/filterByInterval'
        }),
        tableIndex(row) {
            return this.months.indexOf(row) + 1
        },
        showEmployees() {
          this.$store.dispatch('general/EmployeesDialog', true)
        },
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                position: 'top',
                timeout: 1500,
                type: type
            })
        },
        filterData(interval) {
            this.filterByInterval(interval)
        },
        confirm(id) {
            this.$q.dialog({
                title: `${this.$t("general.deleteTitle")}`,
                message: `<span class='text-red'> ${this.$t("general.deleteMessage")}</span>`,
                html: true,
                cancel: true,
                persistent: true
            }).onOk(() => {
                this.removeMonth(id)
                    .then((response) => {
                        this.showNotif(response, 'warning')
                    })
                    .catch((e) => {
                        this.showNotif(e, 'negative')
                    })
            })
        },
        editMonth(id) {
            this.$store.dispatch('general/editMonthDialog', true)
            this.$store.dispatch('months/edit', id)
        },
        viewMonth(id) {
            this.$store.dispatch('general/monthPrint', true)
            this.$store.dispatch('months/edit', id)
        },
        copyMonth(id) {
            this.copy(id)
                .then((response) => {
                    this.showNotif(response, 'positive')
                })
                .catch((e) => {
                    this.showNotif(e, 'negative')
                })
        }
    },
    created() {
        this.$store.dispatch('months/all')
    },
    watch: {
        months: {
            handler() {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>

</style>
