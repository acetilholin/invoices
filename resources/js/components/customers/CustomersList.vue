<template>
    <div class="q-pa-md">
        <create-customer class="q-mt-sm q-mb-md"></create-customer>
        <q-table
            title="Stranke"
            :data="customers"
            :columns="columns"
            row-key="index"
            :filter="filter"
            :loading="loading"
            :pagination.sync="pagination"
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
                    <q-td key="naziv_partnerja" :props="props">
                        {{ props.row.naziv_partnerja }}
                    </q-td>
                    <q-td key="kraj_ulica" :props="props">
                        {{ props.row.kraj_ulica }}
                    </q-td>
                    <q-td key="posta" :props="props">
                        {{ props.row.posta }}
                    </q-td>
                    <q-td key="telefon" :props="props">
                        {{ props.row.telefon }}
                    </q-td>
                    <q-td key="email" :props="props">
                        {{ props.row.email }}
                    </q-td>
                    <q-td key="edit" :props="props">
                        <q-btn-dropdown color="primary" outline icon="settings">
                            <q-list>
                                <q-item clickable v-close-popup @click="editCustomer(props.row.id)">
                                    <q-item-section class="text-center">
                                        <q-item-label><q-icon name="create" class="pointer text-black action-icon"></q-icon> {{ $t("general.edit") }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="customerTotal(props.row.id)">
                                    <q-item-section class="text-center">
                                        <q-item-label><q-icon name="euro_symbol" class="pointer text-black action-icon"></q-icon>  {{ $t("general.total") }}</q-item-label>
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
        <edit-customer></edit-customer>
        <customer-total></customer-total>
    </div>
</template>

<script>

    import CreateCustomer from "./dialogs/CreateCustomer";
    import CustomerTotal from "./dialogs/CustomerTotal";
    import EditCustomer from "./dialogs/EditCustomer";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "CustomersList",
        data() {
          return {
              loading: true,
              id: null,
              customer: [],
              pagination: {
                  rowsPerPage: 30
              },
              filter: '',
              columns: [
                  {
                      name: 'index',
                      label: '#',
                      align: 'center'
                  },
                  {
                      name: 'naziv_partnerja',
                      required: true,
                      label: 'Podjetje/ime in priimek',
                      align: 'center',
                      field: 'naziv_partnerja',
                      format: val => `${val}`,
                      sortable: true
                  },
                  {name: 'kraj_ulica', align: 'center', label: 'Kraj/ulica', field: 'kraj_ulica'},
                  {name: 'posta', align: 'center', label: 'Pošta', field: 'posta'},
                  {name: 'telefon', align: 'center', label: 'Telefon', field: 'telefon'},
                  {name: 'edit', label: 'Uredi', align: 'center'}
              ]
          }
        },
        components: {
            CreateCustomer,
            EditCustomer,
            CustomerTotal
        },
        created() {
            this.$store.dispatch('customers/all')
        },
        computed: {
            ...mapGetters({
                customers: 'customers/getCustomers'
            })
        },
        methods: {
            ...mapActions({
                remove: 'customers/remove'
            }),
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    timeout: 1500,
                    type: type
                })
            },
            tableIndex(row) {
                return this.customers.indexOf(row) + 1
            },
            confirm(id) {
                this.$q.dialog({
                    title: `${this.$t("general.deleteTitle")}`,
                    message: `<span class='text-red'> ${this.$t("general.deleteMessage")}</span><br>${this.$t("general.deleteMessageWarning")}`,
                    html: true,
                    cancel: true,
                    persistent: true
                }).onOk(() => {
                    this.remove(id)
                        .then((response) => {
                            this.showNotif(response, 'warning')
                        })
                        .catch((e) => {
                            this.showNotif(e, 'negative')
                        })
                })
            },
            editCustomer(id) {
                this.$store.dispatch('general/editCustomerModal', true)
                this.$store.dispatch('customers/show', id)
            },
            customerTotal(id) {
                this.$store.dispatch('general/customerTotalDialog', true)
                this.$store.dispatch('customers/total', id)
                this.$store.dispatch('customers/show', id)
            }
        },
        watch: {
            customers: {
                handler() {
                    this.loading = false
                }
            }
        }
    }
</script>

<style scoped>

</style>
