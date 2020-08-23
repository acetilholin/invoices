<template>
    <div>
        <q-dialog
            v-model="editDialog"
            persistent transition-show="scale" transition-hide="scale"
        >
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">{{ $t("klavzule.editKlavzula") }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-form
                        @submit="edit"
                        @reset="reset"
                        class="q-gutter-md"
                    >
                        <div class="row">
                            <q-input
                                v-model="klavzula.short_name"
                                label="Kratica"
                                class="col-3"
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
                                v-model="klavzula.description"
                                label="Opis"
                                class="col-12 input-margin"
                                type="text"
                                autogrow
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
import {mapActions, mapGetters} from "vuex";

export default {
    name: "EditKlavzula",
    data() {
        return {
            submitting: false
        }
    },
    computed: {
        ...mapGetters({
            editDialog: 'general/getEditKlavzulaDialog',
            klavzula: 'klavzule/getKlavzula'
        })
    },
    methods: {
        ...mapActions({
            closeEditDialog: 'general/editKlavzulaDialog',
            editKlavzula: 'klavzule/edit'
        }),
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
        edit() {
            this.submitting = true
            this.editKlavzula(this.klavzula)
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
        reset() {
            this.klavzula.short_name = ''
            this.klavzula.description = ''
        }
    }
}
</script>

<style scoped>

</style>
