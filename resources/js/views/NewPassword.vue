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
                    <q-tab name="email" label="Email"></q-tab>
                    <q-tab name="new-password" label="Novo geslo"></q-tab>
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="email">
                        <div class="text-h6">Ponastavitveni email</div>
                        <q-form
                            @submit="sendEmail"
                            @reset="clearSendEmail"
                            class="q-col-gutter-lg"
                        >
                            <q-input
                                v-model="email"
                                label="Email"
                                autofocus
                                type="email"
                                :rules="[ val => val && val.length > 0 || `${this.$t('general.enterEmail')}`, isValidEmail]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="alternate_email" />
                                </template>
                            </q-input>
                            <div>
                                <q-btn label="Pošlji" type="submit" color="green"/>
                                <q-btn label="Počisti" type="reset" color="primary" flat class="q-ml-sm" />
                            </div>
                        </q-form>
                        <div class="text-center q-mt-lg">
                            <q-btn to="/login-register" icon="login" outline color="primary" label="Prijava" />
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="new-password">
                        <div class="text-h6">Novo geslo</div>
                        <q-form
                            @submit="newPassword"
                            @reset="clearNewPassword"
                            class="q-col-gutter-lg"
                        >
                            <q-input
                                v-model="newPass.email"
                                label="Email"
                                type="email"
                                autofocus
                                :rules="[ val => val && val.length > 0 || `${this.$t('general.enterEmail')}`, isValidEmail]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="alternate_email" />
                                </template>
                            </q-input>

                            <q-input
                                v-model="newPass.token"
                                label="Žeton"
                                type="text"
                                :rules="[
                                 val => val && val.length > 0 || `${this.$t('general.enterToken')}`,
                                 val => val && val.length === 20 || `${this.$t('general.tokenLen20')}` ]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="vpn_key"/>
                                </template>
                            </q-input>

                            <q-input
                                v-model="newPass.password"
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
                                v-model="newPass.password_confirmation"
                                label="Ponovite geslo"
                                type="password"
                                :rules="[
                                    val => val && val.length > 0 || `${this.$t('general.repeatPassword')}`,
                                    val => val === this.newPass.password || `${this.$t('general.passMissmatch')}`]"
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
        name: "NewPassword",
        data() {
            return {
                title: logRegTitle,
                email: '',
                newPass: {
                    email: '',
                    token: '',
                    password: '',
                    password_confirmation: ''
                },
                tab: 'email',
                isPwd1: true,
                isPwd2: true
            }
        },
        methods: {
            ...mapActions({
               sendResetEmail: 'auth/resetEmail',
               changePassword: 'auth/changePassword'
            }),
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    timeout: 1500,
                    type: type
                })
            },
            isValidEmail (val) {
                const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
                return emailPattern.test(val) || `${this.$t("general.wrongEmail")}`;
            },
            sendEmail() {
                this.sendResetEmail(this.email)
                .then((response) => {
                    this.showNotif(response.success,'positive')
                })
                .catch((e) => {
                    this.showNotif(e,'negative')
                })
            },
            clearSendEmail() {
                this.email = ''
            },
            newPassword() {
                this.changePassword(this.newPass)
                .then((response) => {
                    this.showNotif(response.success,'positive')
                    setTimeout( () => this.$router.push({ path: '/login-register'}), 4000);
                })
                .catch((e) => {
                    this.showNotif(e,'negative')
                })
            },
            clearNewPassword() {
                this.newPass = {}
            }
        }
    }
</script>

<style scoped>
    .text-subtitle1 {
        text-decoration: none;
    }
</style>
