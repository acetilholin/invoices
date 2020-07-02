<template>
    <div class="q-pa-md absolute-center">

        <div class="q-gutter-y-md column" style="width: 400px">
            <q-card>
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                >
                    <q-tab name="login" label="Prijava"></q-tab>
                    <q-tab name="register" label="Registracija"></q-tab>
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="login">
                        <div class="text-h6">Prijava</div>
                        <q-form
                            @submit="loginUser"
                            @reset="clearLogin"
                            class="q-col-gutter-lg"
                        >
                            <q-input
                                v-model="loginForm.email"
                                label="Email"
                                type="email"
                                :rules="[ val => val && val.length > 0 || 'Vnesite email naslov']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="alternate_email" />
                                </template>
                            </q-input>
                            <q-input
                                v-model="loginForm.password"
                                :type="isPwd1 ? 'password' : 'text'"
                                label="Geslo"
                                :rules="[ val => val && val.length > 0 || 'Vnesite geslo']"
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
                            <div>
                                <q-btn label="Prijava" type="submit" color="green"/>
                                <q-btn label="Počisti" type="reset" color="primary" flat class="q-ml-sm" />
                            </div>
                        </q-form>
                        <div class="text-center q-mt-lg">
                            <q-btn to="/new-password" outline icon="mail" color="primary" label="Novo geslo" />
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="register">
                        <div class="text-h6">Registracija</div>
                        <q-form
                            @submit="registerUser"
                            @reset="clearRegister"
                            class="q-col-gutter-lg"
                        >
                            <q-input
                                v-model="registerForm.email"
                                label="Email"
                                type="email"
                                :rules="[ val => val && val.length > 0 || 'Vnesite email naslov']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="alternate_email" />
                                </template>
                            </q-input>

                            <q-input
                                v-model="registerForm.username"
                                label="Uporabniško ime"
                                type="text"
                                :rules="[ val => val && val.length > 3  || 'Vnesite uporabniško ime']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="person" />
                                </template>
                            </q-input>

                            <q-input
                                v-model="registerForm.password"
                                label="Geslo"
                                :type="isPwd2 ? 'password' : 'text'"
                                :rules="[ val => val && val.length > 5 || 'Minimalno 6 znakov']"
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
                                v-model="registerForm.password_confirmation"
                                label="Ponovite geslo"
                                type="password"
                                :rules="[
                                    val => val && val.length > 0 || 'Ponovite geslo',
                                    val => val === this.registerForm.password || 'Gesli se ne ujemata']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="lock" />
                                </template>
                            </q-input>
                            <div>
                                <q-btn label="Registracija" type="submit" color="green"/>
                                <q-btn label="Počisti" type="reset" color="primary" flat class="q-ml-sm" />
                            </div>
                        </q-form>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
        </div>
    </div>
</template>

<script>

    import {mapActions} from 'vuex'

    export default {
        name: "LoginRegister",
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                registerForm: {
                    email: '',
                    username: '',
                    password: '',
                    password_confirmation: ''
                },
                tab: 'login',
                isPwd1: true,
                isPwd2: true
            }
        },
        methods: {
            ...mapActions({
               loginAction: 'auth/login',
               registerAction: 'auth/register'
            }),
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    type: type
                })
            },
            clearLogin() {
                this.loginForm = {}
            },
            clearRegister() {
                this.registerForm = {}
            },
            loginUser() {
                this.loginAction(this.loginForm)
                .then((response) => {
                    this.$router.push('/')
                })
                .catch((e) => {
                     this.showNotif(e,'negative')
                })
            },
            registerUser() {
                this.registerAction(this.registerForm)
                .then((response) => {
                    this.showNotif(response.success,'positive')
                })
                .catch((e) => {
                    this.showNotif(e,'negative')
                })
            }
        }
    }
</script>

<style scoped>
</style>
