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
                            <q-avatar class="bg-white">
                                <img :src="userImage(currentUser.picture)" @click="persistent = true" class="pointer">
                            </q-avatar>
                              {{ currentUser.username }}
                        </q-chip>
                    </span>
                <q-btn @click.prevent="signOut" outline color="white" label="Odjava" />
            </q-toolbar>
        </q-header>

        <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 600px; max-width: 70vw;">
                <q-card-section>
                    <div class="text-h6">Uporabnik</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-center mb-2" v-if="currentUser">
                        <img :src="userImage(currentUser.picture)" class="rounded-borders" height="80px" width="80px">
                        <br>
                        <span class="text-h6">{{ currentUser.username }}</span>
                    </div>
                    <q-form
                        @submit="changePassword"
                        @reset="onReset"
                        class="q-gutter-md">
                        <div class="text-h8">Spremeni geslo</div>
                        <q-input
                            v-model="newPass.password_old"
                            label="Trenutno geslo"
                            :type="isPwd1 ? 'password' : 'text'"
                        >
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                            <template v-slot:append>
                                <q-icon
                                    :name="isPwd1 ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd1 = !isPwd1"
                                />
                            </template>
                        </q-input>
                        <q-input
                            v-model="newPass.password"
                            label="Novo geslo"
                            :type="isPwd2 ? 'password' : 'text'"
                        >
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                            <template v-slot:append>
                                <q-icon
                                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd2 = !isPwd2"
                                />
                            </template>
                        </q-input>
                        <q-input
                            v-model="newPass.password_new"
                            label="Ponovite geslo"
                            type="password"
                        >
                            <template v-slot:prepend>
                                <q-icon name="lock" />
                            </template>
                        </q-input>
                        <div>
                            <q-btn label="Spremeni" type="submit" color="green"/>
                            <q-btn label="Počisti" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                    <div class="text-h8 q-pt-lg q-pb-lg">Spremeni sliko</div>
                    <q-form
                        @submit="changePicture">
                        <q-uploader
                            url="http://localhost:4444/upload"
                            style="max-width: 300px"
                        />
                        <div class="q-mt-md">
                            <q-btn label="Spremeni" type="submit" color="green"/>
                        </div>
                    </q-form>
                </q-card-section>
                <q-card-actions align="right" class="bg-white text-teal q-mt-lg">
                    <q-btn flat label="Zapri" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Header",
        data() {
            return {
                persistent: false,
                newPass: {
                    password_old: '',
                    password: '',
                    password_new: ''
                },
                isPwd1: true,
                isPwd2: true
            }
        },
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
                drawerState: 'general/drawerAction',
                newPassword: 'users/changePassword'
            }),
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    type: type
                })
            },
            changePassword() {
                let data = {
                    'password_old': this.newPass.password_old,
                    'password': this.newPass.password,
                    'password_new': this.newPass.password_new,
                    'id': this.currentUser.id
                }
                this.newPassword(data)
                    .then((response) => {
                        this.showNotif(response,'positive')
                    })
                    .catch((e) => {
                        this.showNotif(e,'negative')
                    })
            },
            changePicture() {

            },
            onReset() {
              this.newPass = {}
            },
            userImage(img) {
              return '/pictures/' + img
            },
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
