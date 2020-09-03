<template>
    <div>
        <q-form
            @submit="changePassword"
            @reset="onReset"
            class="q-gutter-md">
            <q-input
                v-model="newPass.password_old"
                label="Trenutno geslo"
                autofocus
                :type="isPwd1 ? 'password' : 'text'"
                :rules="[ val => val && val.length > 5 || `${this.$t('general.min6')}`]"
            >
                <template v-slot:prepend>
                    <q-icon name="lock" />
                </template>
                <template v-slot:append>
                    <q-icon
                        :name="isPwd1 ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd1 = !isPwd1"
                        :rules="[ val => val && val.length > 5 || `${this.$t('general.min6')}`]"
                    />
                </template>
            </q-input>
            <q-input
                v-model="newPass.password"
                label="Novo geslo"
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
                v-model="newPass.password_new"
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
                <q-btn label="Spremeni"
                       :loading="submitting"
                       type="submit"
                       color="secondary"
                >
                    <template v-slot:loading>
                        <q-spinner-tail
                            color="white"
                        />
                    </template>
                </q-btn>
                <q-btn label="Počisti" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>
    </div>
</template>

<script>

    import {mapActions} from 'vuex'

    export default {
        name: "Password",
        data() {
            return {
                newPass: {
                    password_old: '',
                    password: '',
                    password_new: ''
                },
                isPwd1: true,
                isPwd2: true,
                submitting: false
            }
        },
        props: ['currentUser'],
        methods: {
            ...mapActions({
                newPassword: 'users/changePassword',
            }),
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    timeout: 1500,
                    type: type
                })
            },
            changePassword() {
                this.submitting = true
                let data = {
                    'password_old': this.newPass.password_old,
                    'password': this.newPass.password,
                    'password_new': this.newPass.password_new,
                    'id': this.currentUser.id
                }
                this.newPassword(data)
                    .then((response) => {
                        setTimeout(() => {
                            this.showNotif(response,'positive')
                            this.submitting = false
                        }, 500)
                    })
                    .catch((e) => {
                        this.showNotif(e,'negative')
                        this.submitting = false
                    })
            },
            onReset() {
                this.newPass = {}
            },
        }
    }
</script>

<style scoped>

</style>
