<template>
    <div class="q-pa-md">
        <div class="text-center q-mb-md">
            <filter-dates @interval="interval"></filter-dates>
        </div>
        <q-table
            :data="invoices"
            :columns="columns"
            class="q-mb-md"
            row-key="index"
            :pagination.sync="pagination"
        >
            <template v-slot:top-left>
                <span class="q-ml-md text-subtitle1">
                   &Sigma; : <q-badge color="blue-14">{{ totalPrice() | price }} </q-badge>
               </span>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        {{ tableIndex(props.row) }}
                    </q-td>
                    <q-td key="sifra_predracuna" :props="props">
                        {{ props.row.sifra_predracuna }}
                    </q-td>
                    <q-td key="timestamp" :props="props">
                        {{ props.row.timestamp | moment('DD-MM-Y') }}
                    </q-td>
                    <q-td key="total" :props="props">
                        {{ props.row.total | price }}
                    </q-td>
                    <q-td key="expiration" :props="props">
                        <q-badge :color="$moment(today()).isBefore(props.row.expiration) ? 'green' : 'red'">
                            {{ props.row.expiration | moment('DD-MM-Y') }}
                        </q-badge>
                    </q-td>
                    <q-td key="edit" :props="props">
                        <q-icon name="pageview" class="pointer action-icon" @click="view(props.row.id)"></q-icon>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
        <customer-report :invoices="invoices" :customer="customer" :title='$t("customers.report.predracuni")'></customer-report>
        <print-invoice></print-invoice>
    </div>
</template>

<script>

import PrintInvoice from "../../invoices/dialogs/PrintInvoice";
import CustomerReport from "../dialogs/CustomerReport";
import {mapActions} from 'vuex'
import FilterDates from "../../invoices/filter/FilterDates";

export default {
    name: "TotalInvoices",
    data() {
        return {
            pagination: {
                rowsPerPage: 20
            },
            columns: [
                {
                    name: 'index',
                    label: '#',
                    align: 'center'
                },
                {name: 'sifra_predracuna', align: 'center', label: 'Šifra', field: 'sifra_predracuna'},
                {name: 'timestamp', align: 'center', label: 'Ustvarjen', field: 'timestamp'},
                {name: 'total', align: 'center', label: 'Znesek', field: 'total'},
                {name: 'expiration', align: 'center', label: 'Zapadlost', field: 'expiration'},
                {name: 'edit', label: 'Ogled', align: 'center'}
            ]
        }
    },
    components: {
        FilterDates,
        PrintInvoice,
        CustomerReport
    },
    props: ['invoices','customer'],
    filters: {
        price(val) {
            return Math.round(val * 100) / 100 + ' €'
        },
    },
    methods: {
        ...mapActions({
            filter: 'customers/filterInvoices'
        }),
        tableIndex(row) {
            return this.invoices.indexOf(row) + 1
        },
        today() {
            return this.$moment().format('Y-MM-DD')
        },
        interval(interval) {
            interval.customer_id = this.customer.id
            this.filter(interval)
        },
        totalPrice() {
            let total = 0.0

            this.invoices.forEach(item => {
                total += parseFloat(item.total)
            })
           return total
        },
        view(id) {
            this.$store.dispatch('general/printInvoiceDialog', true)
            this.$store.dispatch('invoices/viewInvoice', id)
        }
    }
}
</script>

<style scoped>

</style>
