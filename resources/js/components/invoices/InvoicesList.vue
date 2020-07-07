<template>
    <div class="q-pa-md">
        <q-table
            title="Predračuni"
            :data="invoices"
            :columns="columns"
            row-key="index"
            :pagination.sync="pagination"
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        {{ tableIndex(props.row) }}
                    </q-td>
                    <q-td key="sifra_predracuna" :props="props">
                        {{ props.row.sifra_predracuna }}
                    </q-td>
                    <q-td key="ime_priimek" :props="props">
                        {{ props.row.ime_priimek }}
                    </q-td>
                    <q-td key="timestamp" :props="props">
                        {{ props.row.timestamp | moment('DD-MM-Y') }}
                    </q-td>
                    <q-td key="total" :props="props">
                        {{ props.row.total | decimals }}
                    </q-td>
                    <q-td key="expiration" :props="props">
                        <q-badge :color="$moment(today()).isBefore(props.row.expiration) ? 'green' : 'red'">
                            {{ props.row.expiration | moment('DD-MM-Y') }}
                        </q-badge>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex'

    export default {
        name: "InvoicesList",
        data() {
            return {
                pagination: {
                    rowsPerPage: 50
                },
                columns: [
                    {
                        name: 'index',
                        label: '#',
                        align: 'center'
                    },
                    {
                        name: 'sifra_predracuna',
                        required: true,
                        label: 'Šifra',
                        align: 'center',
                        field: 'sifra_predracuna',
                        format: val => `${val}`,
                        sortable: true
                    },
                    {name: 'ime_priimek', align: 'center', label: 'Ime in priimek', field: 'ime_priimek'},
                    {
                        name: 'timestamp',
                        align: 'center',
                        label: 'Ustvarjen',
                        field: 'timestamp',
                        sortable: true,
                        format: val => `${val}`
                    },
                    {name: 'total', label: 'Znesek', field: 'total', sortable: true,  align: 'center'},
                    {name: 'expiration', label: 'Zapadlost', field: 'expiration', sortable: true,  align: 'center'}
                ]
            }
        },
        filters: {
            decimals(value) {
                return Math.round(value * 100) / 100 + ' €'
            }
        },
        methods: {
            tableIndex(row) {
                return this.invoices.indexOf(row) + 1
            },
            today() {
                return this.$moment().format('Y-MM-DD')
            },
        },
        mounted() {
            this.$store.dispatch('invoices/invoicesAction')
        },
        computed: {
            ...mapGetters({
                invoices: 'invoices/getInvoices'
            })
        }
    }
</script>

<style scoped>
    .q-badge {
        padding: .3rem
    }
</style>
