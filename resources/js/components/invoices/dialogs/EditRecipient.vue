<template>
    <div>
        <q-dialog
            v-model="dialog"
            persistent
        >
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">{{ $t("general.editRecipient") }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-form
                        @submit="onSubmit"
                        @reset="onReset"
                        class="q-gutter-md"
                    >
                        <div class="row">
                            <q-input
                                v-model="recipient.title"
                                label="Naziv"
                                autofocus
                                class="col-11"
                                :rules="[ val => val && val.length > 0 || `${this.$t('general.enterTitle')}`]"
                            />
                        </div>
                        <div class="row">
                            <q-input
                                v-model="recipient.street"
                                label="Kraj/ulica"
                                class="col-6 input-margin"
                                type="text"
                                :rules="[ val => val && val.length > 0 || `${this.$t('general.enterCityStreet')}`]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="add_location" />
                                </template>
                            </q-input>
                            <q-select
                                v-model="posta"
                                use-input
                                hide-selected
                                fill-input
                                input-debounce="0"
                                label="Pošta"
                                class="col-5 input-margin"
                                :options="options"
                                @filter="filterInput"
                                option-label="posta"
                                option-value="posta"
                                type="text"
                                :rules="[val => !!val || `${this.$t('general.enterPost')}`]"
                                map-options
                            >
                                <template v-slot:prepend>
                                    <q-icon name="mail_outline" />
                                </template>
                            </q-select>
                        </div>


                        <div>
                            <q-btn label="Spremeni"
                                   type="submit"
                                   :loading="submitting"
                                   color="green"
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
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="ZAPRI" @click="closeDialog" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "EditRecipient",
    data() {
        return {
            submitting: false,
            options: this.posts,
        }
    },
    props: ['recipient','invoice'],
    created() {
        this.$store.dispatch('post/all')
    },
    computed: {
        ...mapGetters({
            dialog: 'general/getEditRecipientDialog',
            posts: 'post/getPosts'
        }),
        posta: {
            get: function () {
                return this.recipient.posta
            },
            set: function (newValue) {
                this.recipient.posta = newValue.posta
            }
        }
    },
    methods: {
        ...mapActions({
            close: 'general/editRecipientDialog',
            edit: 'invoices/EditRecipient'
        }),
        filterInput(val, update, abort) {
            update(() => {
                const needle = val.toLowerCase()
                this.options = this.posts.filter(
                    v => v.posta.toLowerCase().indexOf(needle) > -1
                )
            })
        },
        closeDialog() {
            this.close(false)
        },
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                position: 'top',
                type: type
            })
        },
        onReset() {
            this.recipient.title = ''
            this.recipient.street = ''
            this.recipient.posta = ''
        },
        onSubmit() {
            this.submitting = true
            this.edit(this.recipient)
                .then((response) => {
                    this.showNotif(response, 'positive')
                    setTimeout(() => {
                        this.submitting = false
                    }, 500)
                })
                .catch((e) => {
                    this.showNotif(e, 'negative')
                })

        }
    }
}
</script>

<style scoped>

</style>
