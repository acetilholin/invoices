<template>
    <div class="q-pa-md">
        <q-table
            title="Predračuni"
            :data="invoices"
            :columns="columns"
            row-key="index"
            :pagination.sync="pagination"
            rows-per-page-label="Vrstic na strani"
            :pagination-label="getPaginationLabel"
            no-data-label="Ni podatkov"
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        {{ count() }}
                    </q-td>
                    <q-td key="sifra_predracuna" :props="props">
                        {{ props.row.sifra_predracuna }}
                    </q-td>
                    <q-td key="ime_priimek" :props="props">
                        {{ props.row.ime_priimek }}
                    </q-td>
                    <q-td key="timestamp" :props="props">
                        {{ props.row.timestamp }}
                    </q-td>
                    <q-td key="total" :props="props">
                        {{ props.row.total }}
                    </q-td>
                    <q-td key="expiration" :props="props">
                        <q-badge color="green">
                            {{ props.row.expiration }}
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
                i: 1,
                pagination: {
                    rowsPerPage: 50
                },
                columns: [
                    {
                        name: 'index',
                        label: '#',
                        align: 'center',
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
                    {name: 'total', label: 'Znesek', field: 'total', sortable: true, format: val => `${val} €`},
                    {name: 'expiration', label: 'Zapadlost', field: 'expiration', sortable: true}
                ]
            }
        },
        methods: {
            getPaginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
                return firstRowIndex + '-' + endRowIndex + ' od ' + totalRowsNumber
            },
            count() {
                return this.i++
            }
        },
        created() {
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

</style>
