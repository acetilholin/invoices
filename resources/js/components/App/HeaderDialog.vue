<template>
    <div>
        <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
            <q-card style="width: 600px; max-width: 70vw;">
                <q-card-section>
                    <div class="text-h6">{{ $t("header.user") }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-tabs
                        v-model="tab"
                        dense
                        class="text-grey"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator
                    >
                        <q-tab name="password" label="Geslo"></q-tab>
                        <q-tab name="picture" label="Slika"></q-tab>
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="tab" class="mt-5" animated>
                        <q-tab-panel name="password">
                           <password-form :currentUser="currentUser"></password-form>
                        </q-tab-panel>
                        <q-tab-panel name="picture">
                            <picture-form :currentUser="currentUser"></picture-form>
                        </q-tab-panel>
                    </q-tab-panels>
                </q-card-section>
                <q-card-actions align="right" class="bg-white text-teal q-mt-lg">
                    <q-btn flat label="Zapri" @click="closeDialog" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
    import Password from "../forms/Header/Password";
    import Picture from "../forms/Header/Picture";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "HeaderDialog",
        data() {
            return {
                tab: 'password'
            }
        },
        props: ['currentUser'],
        computed: {
          ...mapGetters({
              persistent: 'general/getDialog'
          })
        },
        components: {
          'password-form': Password,
          'picture-form': Picture
        },
        methods: {
            ...mapActions({
                signoutAction: 'auth/logout',
                triggerModal: 'general/modalAction'
            }),
            closeDialog() {
                this.triggerModal(false)
            },
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    timeout: 1500,
                    type: type
                })
            },
            signOut() {
                this.signoutAction()
                    .then(() => {
                        this.$router.push('/login-register')
                    })
            }
        }
    }
</script>

<style scoped>

</style>
