<template>
    <div class="employee-list">
        <q-table
            title="Zaposleni"
            :data="employees"
            :columns="columns"
            row-key="name"
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        {{ tableIndex(props.row) }}
                    </q-td>
                    <q-td key="person"
                          :props="props"
                    >
                        {{ props.row.person }}
                    </q-td>
                    <q-td key="address"
                          :props="props"
                    >
                        {{ props.row.address }}
                    </q-td>
                    <q-td key="posta"
                          :props="props"
                    >
                        {{ props.row.posta }}
                    </q-td>
                    <q-td key="edit"
                          :props="props"
                    >
                        <q-btn-dropdown color="primary"
                                        outline
                                        icon="settings"
                        >
                            <q-list>
                                <q-item clickable
                                        v-close-popup
                                        @click="edit(props.row.id)"
                                >
                                    <q-item-section class="text-center">
                                        <q-item-label>
                                            <q-icon name="create"
                                                    class="pointer text-black action-icon"
                                            ></q-icon>
                                            {{ $t("general.edit") }}
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable
                                        v-close-popup
                                        @click="confirm(props.row.id)"
                                >
                                    <q-item-section class="text-center text-red">
                                        <q-item-label>
                                            <q-icon name="delete_outline"
                                                    class="pointer action-icon"
                                            ></q-icon>
                                            {{ $t("general.delete") }}
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
        <edit-employee></edit-employee>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import EditEmployee from "./dialogs/EditEmployee";

export default {
    name: "EmployeeList",
    components: {EditEmployee},
    data() {
        return {
            columns: [
                {
                    name: 'index',
                    label: '#',
                    align: 'center'
                },
                {name: 'person', align: 'center', label: 'Delavec', field: 'person'},
                {name: 'address', label: 'Naslov', field: 'address', align: 'center'},
                {name: 'posta', label: 'Pošta', field: 'posta', align: 'center'},
                {name: 'edit', label: 'Uredi', align: 'center'}
            ]
        }
    },
    computed: {
        ...mapGetters({
            employees: 'employees/getEmployees',
            posts: 'post/getPosts'
        })
    },
    created() {
        this.$store.dispatch('employees/all')
    },
    methods: {
        ...mapActions({
            remove: 'employees/remove'
        }),
        tableIndex(row) {
            return this.employees.indexOf(row) + 1
        },
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                position: 'top',
                timeout: 1500,
                type: type
            })
        },
        edit(id) {
            this.$store.dispatch('general/editEmployeeModal', true)
            this.$store.dispatch('employees/edit', id)
        },
        confirm(id) {
            this.$q.dialog({
                title: `${this.$t("general.deleteTitle")}`,
                message: `<span class='text-red'> ${this.$t("general.deleteMessage")}</span>`,
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
    }
}
</script>

<style scoped>

</style>
