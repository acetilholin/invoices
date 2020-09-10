<template>
    <div class="create-employee">
        <q-dialog
            v-model="medium"
            persistent
        >
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">{{ $t("employees.createEmployee") }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-form
                        @submit="onSubmit"
                        @reset="onReset"
                        class="q-gutter-md"
                    >
                        <q-input
                            v-model="employee.person"
                            label="Ime in priimek"
                            :rules="[ val => val && val.length > 0 || `${this.$t('employees.insertEmployee')}`]"
                        >
                            <template v-slot:prepend>
                                <q-icon name="person" />
                            </template>
                        </q-input>

                        <q-input
                            v-model="employee.address"
                            label="Naslov"
                            :rules="[ val => val && val.length > 0 || `${this.$t('employees.enterAddress')}`]"
                        >
                            <template v-slot:prepend>
                                <q-icon name="add_location" />
                            </template>
                        </q-input>
                        <q-select
                            v-model="employee.posta"
                            use-input
                            hide-selected
                            fill-input
                            input-debounce="0"
                            label="Pošta"
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

                        <div>
                            <q-btn label="Shrani"
                                   :loading="submitting"
                                   type="submit"
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

import {mapGetters, mapActions} from 'vuex'

export default {
    name: "CreateEmployee",
    data() {
        return {
            employee: {
                person: '',
                address: '',
                posta: ''
            },
            submitting: false,
            options: this.posts
        }
    },
    computed: {
        ...mapGetters({
            medium: 'general/getCreateEmployee',
            posts: 'post/getPosts'
        })
    },
    created() {
        this.$store.dispatch('post/all')
    },
    methods: {
        ...mapActions({
            close: 'general/CreateEmployeeDialog',
            createEmployee: 'employees/create'
        }),
        filterInput(val, update, abort) {
            update(() => {
                const needle = val.toLowerCase()
                this.options = this.posts.filter(
                    v => v.posta.toLowerCase().indexOf(needle) > -1
                )
            })
        },
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                position: 'top',
                timeout: 1500,
                type: type
            })
        },
        closeDialog() {
            this.close(false)
        },
        onSubmit() {
            this.submitting = true
            this.createEmployee(this.employee)
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
        },
        onReset() {
            this.employee = {}
        }
    }
}
</script>

<style scoped>

</style>
