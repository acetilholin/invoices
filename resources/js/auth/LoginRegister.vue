<template>
    <div class="q-pa-md absolute-center">

        <div class="q-gutter-y-md column" style="width: 400px">
            <span class="text-center text-subtitle1 text-primary">{{ title }}</span>
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
                                autofocus
                                type="text"
                                :rules="[ val => val && val.length > 0 || `${this.$t('general.enterEmail')}`, isValidEmail]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="alternate_email" />
                                </template>
                            </q-input>
                            <q-input
                                v-model="loginForm.password"
                                :type="isPwd1 ? 'password' : 'text'"
                                label="Geslo"
                                :rules="[ val => val && val.length > 0 || `${this.$t('general.enterPassword')}`]"
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
                                autofocus
                                type="email"
                                :rules="[ val => val && val.length > 0 || `${this.$t('general.enterEmail')}`, isValidEmail]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="alternate_email" />
                                </template>
                            </q-input>

                            <q-input
                                v-model="registerForm.username"
                                label="Uporabniško ime"
                                type="text"
                                :rules="[ val => val && val.length > 3  || `${this.$t('general.enterUsername')}`]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="person" />
                                </template>
                            </q-input>

                            <q-input
                                v-model="registerForm.password"
                                label="Geslo"
                                :type="isPwd2 ? 'password' : 'text'"
                                :rules="[ val => val && val.length > 5 || `${this.$t('general.min6')}`]"
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
                                    val => val && val.length > 0 || `${this.$t('general.repeatPassword')}`,
                                    val => val === this.registerForm.password || `${this.$t('general.passMissmatch')}`]"
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
    import { logRegTitle } from '../global/variables.js'

    export default {
        name: "LoginRegister",
        data() {
            return {
                title: logRegTitle,
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
            isValidEmail (val) {
                const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
                return emailPattern.test(val) || `${this.$t("general.wrongEmail")}`;
            },
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    timeout: 1500,
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
                    this.showNotif(`${this.$t('general.helloMessage')}`,'positive')
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
