<template>
    <div>
        <q-dialog
            v-model="editDialog"
            persistent transition-show="scale" transition-hide="scale"
        >
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">{{ $t("customers.editCustomer") }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-form
                        @submit="edit"
                        @reset="onReset"
                        class="q-gutter-md"
                    >
                        <div class="row">
                            <q-input
                                v-model="customer.naziv_partnerja"
                                label="Podjetje / ime in priimek"
                                class="col-12"
                                type="text"
                                :rules="[ val => val && val.length > 0 || `${this.$t('general.enterCustomer')}`]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="business_center" />
                                </template>
                            </q-input>
                        </div>
                        <div class="row">
                            <q-input
                                v-model="customer.kraj_ulica"
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
                                v-model="customer.posta"
                                use-input
                                hide-selected
                                fill-input
                                input-debounce="0"
                                label="Pošta"
                                class="col-4 input-margin"
                                :options="options"
                                @filter="filterInput"
                                option-label="posta"
                                type="text"
                                :rules="[val => !!val || `${this.$t('general.enterPost')}`]"
                                map-options
                            >
                                <template v-slot:prepend>
                                    <q-icon name="mail_outline" />
                                </template>
                            </q-select>
                        </div>
                        <div class="row">
                            <q-input
                                v-model="customer.email"
                                label="Email"
                                class="col-4 input-margin"
                                type="text"
                                :rules="[isValidEmail]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="alternate_email" />
                                </template>
                            </q-input>
                            <q-input
                                v-model="customer.telefon"
                                label="Telefon"
                                class="col-3 input-margin"
                                mask="###-###-###"
                                hint="Format: 031-123-456"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="phone" />
                                </template>
                            </q-input>
                            <q-input
                                v-model="customer.id_ddv"
                                label="ID za DDV"
                                class="col-3 input-margin"
                                hint=""
                            >
                                <template v-slot:prepend>
                                    <q-icon name="work" />
                                </template>
                            </q-input>
                        </div>
                        <div class="row">
                            <q-input
                                v-model="customer.sklic_st"
                                label="Sklic št."
                                class="col-4 input-margin"
                                type="text"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="work" />
                                </template>
                            </q-input>
                        </div>
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
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="ZAPRI" @click="closeDialog" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "EditCustomer",
        data() {
            return {
                visible: true,
                submitting: false,
                options: this.posts
            }
        },
        methods: {
            ...mapActions({
                closeEditDialog: 'general/editCustomerModal',
                editCustomer: 'customers/edit'
            }),
            closeDialog() {
                this.closeEditDialog(false)
            },
            isValidEmail(val) {
                if (val) {
                    if (val.length > 0) {
                        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
                        return emailPattern.test(val) || `${this.$t("general.wrongEmail")}`;
                    }
                }
            },
            filterInput (val, update, abort) {
                update(() => {
                    const needle = val.toLowerCase()
                    this.options = this.posts.filter(
                        v => v.posta.toLowerCase().indexOf(needle) > -1
                    )
                })
            },
            onReset() {
                this.customer.naziv_partnerja = ''
                this.customer.kraj_ulica = ''
                this.customer.posta = ''
                this.customer.email = ''
                this.customer.telefon = ''
                this.customer.id_ddv = ''
                this.customer.sklic_st = ''
            },
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    timeout: 1500,
                    type: type
                })
            },
            edit() {
                this.submitting = true
                this.editCustomer(this.customer)
                    .then((response) => {
                        this.showNotif(response, 'positive')
                        setTimeout(() => {
                            this.submitting = false
                        }, 500)
                    })
                    .catch((e) => {
                        this.showNotif(e, 'negative')
                        this.submitting = false
                    })
            }
        },
        computed: {
            ...mapGetters({
                editDialog: 'general/getEditDialog',
                getCustomers: 'customers/getCustomer',
                posts: 'post/getPosts'
            }),
            customer() {
                return this.getCustomers
            }
        }
    }
</script>

<style scoped>

</style>
