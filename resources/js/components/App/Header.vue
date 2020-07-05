<template>
    <div>
        <q-header elevated class="bg-primary text-white" v-show="authenticated">
            <q-toolbar>
                <q-btn flat @click="changeDrawerState" round dense icon="menu" />
                <q-toolbar-title>Predračuni</q-toolbar-title>
                <span class="q-mr-md">
                        <q-btn dense color="blue-10" round icon="email" class="q-ml-md">
                        <q-badge color="red" floating>1</q-badge>
                    </q-btn>
                    </span>
                <span class="q-mr-md" v-if="currentUser">
                        <q-chip>
                            <q-avatar>
                              <img src="https://cdn.quasar.dev/img/avatar1.jpg">
                            </q-avatar>
                              {{ currentUser.username }}
                        </q-chip>
                    </span>
                <q-btn @click.prevent="signOut" outline color="white" label="Odjava" />
            </q-toolbar>
        </q-header>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Header",
        computed: {
            ...mapGetters({
                currentUser: 'auth/user',
                authenticated: 'auth/authenticated',
                drawer: 'general/getDrawer'
            }),
            currentPage() {
                return this.$route.path
            }
        },
        methods: {
            ...mapActions({
                signoutAction: 'auth/logout',
                drawerState: 'general/drawerAction'

            }),
            signOut() {
                this.signoutAction()
                    .then(() => {
                        this.$router.push('/login-register')
                    })
            },
            changeDrawerState() {
                this.drawerState(!this.drawer)
            }
        }
    }
</script>

<style scoped>

</style>
