<template>
    <div class="q-pa-md">
        <create-user class="q-mt-sm q-mb-md"></create-user>
        <q-table
            title="Uporabniki"
            :data="users"
            :columns="columns"
            row-key="name"
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        {{ tableIndex(props.row) }}
                    </q-td>
                    <q-td key="username" :props="props">
                        {{ props.row.username }}
                    </q-td>
                    <q-td key="email" :props="props">
                        {{ props.row.email }}
                    </q-td>
                    <q-td key="enabled" :props="props">
                        <q-badge :color="badge(props.row.enabled)">
                            <q-icon :name="props.row.enabled | enabled " />
                        </q-badge>
                    </q-td>
                    <q-td key="role" :props="props">
                        {{ props.row.role }}
                    </q-td>
                    <q-td key="picture" :props="props">
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                    </q-td>
                    <q-td key="online" :props="props">
                        <span class="text-green text-weight-bold" v-if="props.row.online">
                             {{ props.row.online | online }}
                        </span>
                    </q-td>
                    <q-td key="last_seen" :props="props">
                        {{ props.row.last_seen | moment('hh:mm DD-MM-Y') }}
                    </q-td>
                    <q-td key="country" :props="props">
                        {{ props.row.country }}
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>

    import CreateUser from "./CreateUser";
    import {mapGetters} from "vuex";

    export default {
        name: "UsersList",
        data () {
            return {
                columns: [
                    {
                        name: 'index',
                        label: '#',
                        align: 'center'
                    },
                    {
                        name: 'username',
                        required: true,
                        label: 'Uporabniško ime',
                        align: 'center',
                        field: 'username',
                        format: val => `${val}`,
                        sortable: true
                    },
                    {name: 'email', align: 'center', label: 'Email', field: 'email'},
                    {name: 'enabled', label: 'Odobren', field: 'enabled', align: 'center', sortable: true},
                    {name: 'role', label: 'Vloga', field: 'role', sortable: true, align: 'center'},
                    {name: 'picture', label: 'Avatar', field: 'picture', sortable: true, align: 'center'},
                    {name: 'online', label: 'Online', field: 'online', align: 'center', sortable: true},
                    {name: 'last_seen', label: 'Zadnjič tu', field: 'last_seen', align: 'center', sortable: true},
                    {name: 'country', label: 'Država', field: 'country', sortable: true, align: 'center'}
                ]
            }
        },
        components: {
          CreateUser
        },
        filters: {
            enabled(value) {
                return value === 1 ? 'done' : 'clear'
            },
            online(value) {
                return 'online'
            }
        },
        methods: {
            tableIndex(row) {
                return this.users.indexOf(row) + 1
            },
            badge(value) {
                return value === 1 ? 'green' : 'red'
            }
        },
        mounted() {
            this.$store.dispatch('users/usersAction')
        },
        computed: {
            ...mapGetters({
                users: 'users/getUsers'
            })
        }
    }
</script>

<style scoped>

</style>
