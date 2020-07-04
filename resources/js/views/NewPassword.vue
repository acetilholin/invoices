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
                                type="email"
                                :rules="[ val => val && val.length > 0 || 'Vnesite email naslov']"
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
                                :rules="[ val => val && val.length > 0 || 'Vnesite email naslov']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="alternate_email" />
                                </template>
                            </q-input>

                            <q-input
                                v-model="newPass.token"
                                label="Žeton"
                                type="text"
                                :rules="[ val => val && val.length > 0 || 'Vnesite prejeti žeton']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="vpn_key" />
                                </template>
                            </q-input>

                            <q-input
                                v-model="newPass.password"
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
                                v-model="newPass.password_confirmation"
                                label="Ponovite geslo"
                                type="password"
                                :rules="[
                                    val => val && val.length > 0 || 'Ponovite geslo',
                                    val => val === this.newPass.password || 'Gesli se ne ujemata']"
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

    export default {
        name: "NewPassword",
        data() {
            return {
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
                    type: type
                })
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
                this.newPassword = {}
            }
        }
    }
</script>

<style scoped>
    .text-subtitle1 {
        text-decoration: none;
    }
</style>
