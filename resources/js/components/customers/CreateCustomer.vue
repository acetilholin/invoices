<template>
    <div class="create-customer">
        <div class="text-center">
            <create @triggerModal="modal"></create>
        </div>
        <q-dialog
            v-model="medium"
        >
            <q-card style="width: 750px; max-width: 85vw;">
                <q-card-section>
                    <div class="text-h6">Nova stranka</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-form
                        @submit="onSubmit"
                        @reset="onReset"
                        class="q-gutter-md"
                    >
                        <div class="row">
                            <q-input
                                v-model="customer.company"
                                label="Naziv/podjetje"
                                class="col-6 input-margin"
                                type="text"
                                :rules="[ val => val && val.length > 0 || 'Vnesite naziv/podjetje']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="business_center" />
                                </template>
                            </q-input>
                            <q-input
                                v-model="customer.fullname"
                                label="Ime in priimek"
                                class="col-5 input-margin"
                                type="text"
                                :rules="[ val => val && val.length > 0 || 'Vnesite ime in priimek']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="person" />
                                </template>
                            </q-input>
                        </div>
                        <div class="row">
                            <q-input
                                v-model="customer.street"
                                label="Kraj/ulica"
                                class="col-4 input-margin"
                                type="text"
                                :rules="[ val => val && val.length > 0 || 'Vnesite kraj/ulica']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="add_location" />
                                </template>
                            </q-input>
                            <q-select
                                v-model="customer.post"
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
                                :rules="[val => !!val || 'Vnesite pošto']"
                                map-options
                            >
                                <template v-slot:prepend>
                                    <q-icon name="mail_outline" />
                                </template>
                            </q-select>
                            <q-input
                                v-model="customer.telephone"
                                label="Telefon"
                                class="col-3 input-margin"
                                mask="###-###-###"
                                hint="Maska: 031-123-456"
                                :rules="[ val => val && val.length > 0 || 'Vnesite telefon']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="phone" />
                                </template>
                            </q-input>
                        </div>
                        <div class="row">
                            <q-input
                                v-model="customer.email"
                                label="Email"
                                class="col-4 input-margin"
                                type="text"
                                :rules="[ val => val && val.length > 0 || 'Vnesite email naslov', isValidEmail]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="alternate_email" />
                                </template>
                            </q-input>
                            <q-input
                                v-model="customer.sklic"
                                label="Sklic št."
                                class="col-4 input-margin"
                                type="text"
                                :rules="[ val => val && val.length > 0 || 'Vnesite sklic št.']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="work" />
                                </template>
                            </q-input>
                            <q-input
                                v-model="customer.id_ddv"
                                label="ID za DDV"
                                class="col-3 input-margin"
                                mask="SI########"
                                hint="Maska: SI12345678"
                                :rules="[ val => val && val.length > 0 || 'Vnesite ID za DDV']"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="work" />
                                </template>
                            </q-input>
                        </div>
                        <div>
                            <q-btn label="Ustvari" type="submit" color="green"/>
                            <q-btn label="Počisti" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                </q-card-section>
                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="ZAPRI" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex'
    import Create from "../App/Create";

    export default {
        name: "CreateCustomer",
        data() {
            return {
                medium: false,
                customer: {
                    company: '',
                    fullname: '',
                    street: '',
                    post: null,
                    telephone: '',
                    email: '',
                    sklic: '',
                    id_ddv: ''
                },
                options: this.posts
            }
        },
        components: {
            Create
        },
        computed: {
          ...mapGetters({
              posts: 'general/getPosts'
          })
        },
        created() {
            this.$store.dispatch('general/postAction')
        },
        methods: {
            modal(param) {
                this.medium = param
            },
            filterInput (val, update, abort) {
                update(() => {
                    const needle = val.toLowerCase()
                    this.options = this.posts.filter(
                        v => v.posta.toLowerCase().indexOf(needle) > -1
                    )
                })
            },
            isValidEmail (val) {
                const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
                return emailPattern.test(val) || 'Neveljaven email';
            },
            onReset() {
                this.customer = {}
            },
            onSubmit() {

            }
        }

    }
</script>

<style scoped>

</style>
