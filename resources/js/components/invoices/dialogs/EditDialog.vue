<template>
    <div>
        <q-dialog
            v-model="dialog"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card class="bg-white text-black">
                <q-bar>
                    <q-space />
                    <q-btn dense flat icon="close" @click="closeDialog()">
                        <q-tooltip content-class="bg-white text-primary">Zapri</q-tooltip>
                    </q-btn>
                </q-bar>

                <q-card-section>
                    <div class="text-h5">Urejanje predračuna - {{ invoice.sifra_predracuna }}, <span class="text-primary">{{ invoice.ime_priimek }}</span></div>
                    <div class="text-body1">Ustvaril: <span class="text-grey-8">{{ invoice.author}}, dne: {{ invoice.timestamp | moment('DD-MM-Y') }}</span></div>
                    <div class="text-body1">Datum zapadlosti: <span :class="$moment(today()).isBefore(invoice.expiration) ? 'text-green' : 'text-red'">{{ invoice.expiration | moment('DD-MM-Y') }}</span></div>
                    <div class="text-body1">Delo opravljeno: <span class="text-grey-8">{{ invoice.work_date | moment('DD-MM-Y') }}</span></div>
                    <div class="text-body1">Klavzula: <span class="text-grey-8">{{ invoice.klavzula }}</span></div>
                </q-card-section>

                <q-card-section class="q-pt-none">

                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "EditDialog",
        data() {
            return {
                maximizedToggle: true,
            }
        },
        computed: {
            ...mapGetters({
                dialog: 'general/getEditInvoiceModal',
                invoice: 'invoices/getInvoice'
            })
        },
        methods: {
            ...mapActions({
               closeEditDialog: 'general/editInvoiceDialogAction'
            }),
            closeDialog() {
              this.closeEditDialog(false)
            },
            today() {
                return this.$moment().format('Y-MM-DD')
            },
        }
    }
</script>

<style scoped>

</style>
