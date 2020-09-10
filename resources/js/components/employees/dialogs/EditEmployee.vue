<template>
    <div class="edit-employee">
        <q-dialog
            v-model="editDialog"
        >
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">{{ $t("employees.editEmployee") }}</div>
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

import {mapActions, mapGetters} from 'vuex'

export default {
    name: "EditEmployee",
    data() {
        return {
            submitting: false,
            options: this.posts
        }
    },
    computed: {
        ...mapGetters({
            editDialog: 'general/getEditEmployee',
            employee: 'employees/getEmployee',
            posts: 'post/getPosts'
        })
    },
    created() {
        this.$store.dispatch('post/all')
    },
    methods: {
        ...mapActions({
            closeEditDialog: 'general/editEmployeeModal',
            updateEmployee: 'employees/update'
        }),
        filterInput (val, update, abort) {
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
            this.closeEditDialog(false)
        },
        onSubmit() {
            this.submitting = true
            this.updateEmployee(this.employee)
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
            this.employee.person = ''
            this.employee.address = ''
            this.employee.posta = ''
        }
    }
}
</script>

<style scoped>

</style>
