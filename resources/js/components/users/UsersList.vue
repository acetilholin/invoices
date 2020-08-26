<template>
    <div class="q-pa-md">
        <create-user class="q-mt-sm q-mb-md"></create-user>
        <q-table
            title="Uporabniki"
            :data="users"
            :columns="columns"
            row-key="name"
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
                    <q-td key="username" :props="props">
                        {{ props.row.username }}
                    </q-td>
                    <q-td key="email" :props="props">
                        {{ props.row.email }}
                    </q-td>
                    <q-td key="enabled" :props="props">
                        <q-badge :color="badge(props.row.enabled)" @click="enabledDisabled(props.row.id, props.row.enabled)" class="pointer">
                            <q-icon :name="props.row.enabled | enabled " />
                        </q-badge>
                    </q-td>
                    <q-td key="role" :props="props">
                        <span class="pointer" @click="adminUser(props.row.id, props.row.role)">{{ props.row.role | role }}</span>
                    </q-td>
                    <q-td key="picture" :props="props">
                        <q-avatar size="40px">
                            <img :src="userImage(props.row.picture)" alt="">
                        </q-avatar>
                    </q-td>
                    <q-td key="online" :props="props">
                        <q-badge color="green" v-if="props.row.online === 'online'">
                            {{ props.row.online }}
                        </q-badge>
                    </q-td>
                    <q-td key="last_seen" :props="props">
                        {{ props.row.last_seen | moment('hh:mm DD-MM-Y') }}
                    </q-td>
                    <q-td key="country" :props="props">
                        <img :src="countryImage(props.row.country)" alt="" width="40px" height="40px">
                    </q-td>
                    <q-td key="edit" :props="props">
                        <q-icon name="delete_outline" @click="confirm(props.row.id)" class="pointer text-red action-icon"></q-icon>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>

    import CreateUser from "./CreateUser";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "UsersList",
        data() {
            return {
                filter: '',
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
                    {name: 'country', label: 'Država', field: 'country', sortable: true, align: 'center'},
                    {name: 'edit', label: 'Uredi', align: 'center'}
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
            role(value) {
                return value === 'admin' ? 'administrator' : 'uporabnik'
            }
        },
        methods: {
            ...mapActions({
                changeDetail: 'users/changeSingleDetail',
                remove: 'users/removeUser'
            }),
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    timeout: 1500,
                    type: type
                })
            },
            countryImage(img) {
                return '/countries/' + img + '.svg'
            },
            userImage(img) {
                return '/pictures/' + img
            },
            tableIndex(row) {
                return this.users.indexOf(row) + 1
            },
            badge(value) {
                return value === 1 ? 'green' : 'red'
            },
            enabledDisabled(id, status) {
                let details = {
                    'id': id,
                    'data': !status,
                    'attr': 'enabled'
                }
                this.changeDetail(details)
                    .then((response) => {
                        this.showNotif
                        this.showNotif(response, 'positive')
                    })
                    .catch((e) => {
                        this.showNotif(e, 'negative')
                    })
            },
            adminUser(id, role) {
                let details = {
                    'id': id,
                    'data': role,
                    'attr': 'role'
                }
                this.changeDetail(details)
                    .then((response) => {
                        this.showNotif(response, 'positive')
                    })
                    .catch((e) => {
                        this.showNotif(e, 'negative')
                    })

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
            }
        },
        created() {
            this.$store.dispatch('users/all')
        },
        computed: {
            ...mapGetters({
                users: 'users/getUsers'
            })
        }
    }
</script>

<style scoped>
.online{
    height: 10px;
    width: 10px;
    background-color: darkgreen;
    border-radius: 50%;
    display: inline-block;
}
</style>
