<template>
    <div class="q-pa-md">
        <create-customer class="q-mt-sm q-mb-md"></create-customer>
        <q-table
            title="Stranke"
            :data="customers"
            :columns="columns"
            row-key="name"
            :filter="filter"
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
                    <q-td key="ime_priimek" :props="props">
                        {{ props.row.ime_priimek }}
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
                                <q-item clickable v-close-popup @click="removeCustomer(props.row.id)">
                                    <q-item-section class="text-center">
                                        <q-item-label><q-icon name="delete_outline" class="pointer text-red action-icon"></q-icon></q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="editUser(props.row.id)">
                                    <q-item-section class="text-center">
                                        <q-item-label><q-icon name="create" class="pointer text-black action-icon"></q-icon></q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>

    import CreateCustomer from "./CreateCustomer";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "CustomersList",
        data() {
          return {
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
                      name: 'ime_priimek',
                      required: true,
                      label: 'Ime in priimek',
                      align: 'center',
                      field: 'ime_priimek',
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
            CreateCustomer
        },
        created() {
            this.$store.dispatch('customers/customersAction')
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
                    type: type
                })
            },
            tableIndex(row) {
                return this.customers.indexOf(row) + 1
            },
            removeCustomer(id) {
                this.remove(id)
                    .then((response) => {
                        this.showNotif(response, 'positive')
                    })
                    .catch((e) => {
                        this.showNotif(e, 'negative')
                    })
            }
        }
    }
</script>

<style scoped>

</style>
