<template>
    <div class="create-customer">
        <div class="text-center">
            <create @triggerModal="modal"></create>
        </div>
        <q-dialog
            v-model="medium"
            ref="createModal"
            persistent transition-show="scale" transition-hide="scale"
        >
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">{{ $t("klavzule.newKlavzula") }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-form
                        @submit="createNew"
                        @reset="clearForm"
                        class="q-col-gutter-lg"
                    >
                        <div class="row">
                            <q-input
                                v-model="klavzula.shortName"
                                label="Kratica"
                                type="text"
                                class="col-4"
                                :rules="[ val => val && val.length > 0 || `${this.$t('klavzule.klavzulaShort')}`]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="label" />
                                </template>
                            </q-input>
                        </div>
                        <div class="row">
                            <q-input
                                v-model="klavzula.description"
                                label="Opis"
                                class="col-12"
                                type="text"
                                :rules="[ val => val && val.length > 0 || `${this.$t('klavzule.klavzulaDesc')}`]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="create" />
                                </template>
                            </q-input>
                        </div>
                        <div>
                            <q-btn label="Ustvari"
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
                    <q-btn flat label="Zapri" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

import Create from "../../App/Create";
import {mapActions} from 'vuex'

export default {
    name: "CreateKlavzula",
    data() {
        return {
            medium: false,
            submitting: false,
            klavzula: {
                shortName: '',
                description: ''
            }
        }
    },
    components: {
        Create
    },
    methods: {
        ...mapActions({
           create: 'klavzule/create'
        }),
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                position: 'top',
                timeout: 1500,
                type: type
            })
        },
        modal(param) {
            this.medium = param
        },
        createNew() {
            this.submitting = true
            this.create(this.klavzula)
                .then((response) => {
                    this.showNotif(response, 'positive')
                    setTimeout(() => {
                        this.submitting = false
                        this.$refs.createModal.hide()
                    }, 500)
                })
                .catch((e) => {
                    this.showNotif(e, 'negative')
                    this.submitting = false
                })
        },
        clearForm() {
            this.klavzula = {}
        }
    }
}
</script>

<style scoped>

</style>
