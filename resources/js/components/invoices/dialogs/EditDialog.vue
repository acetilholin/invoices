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
                    <div class="text-h5">Urejanje predračuna: <span class="text-primary">{{ invoice.ime_priimek }}</span></div>
                    <div class="text-body1">Ustvaril: <span class="text-grey-8">{{ invoice.author}}, dne: {{ invoice.timestamp | moment('DD-MM-Y') }}</span></div>
                    <div class="text-body1">Datum zapadlosti: <span :class="$moment(today()).isBefore(invoice.expiration) ? 'text-green' : 'text-red'">{{ invoice.expiration | moment('DD-MM-Y') }}</span></div>
                    <div class="text-body1">Delo opravljeno: <span class="text-grey-8">{{ invoice.workDate | moment('DD-MM-Y') }}</span></div>
                    <div class="text-body1">Klavzula: <span class="text-grey-8">{{ invoice.klavzula }}</span></div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="row q-pa-md">
                        <q-select v-model="vat"
                                  :options="vatOptions"
                                  @input="vChanged"
                                  option-value="val"
                                  option-label="desc"
                                  label="DDV"
                                  class="col-1"
                        />
                        <q-select v-model="klavzula"
                                  :options="klavzule"
                                  label="Klavzula"
                                  @input="kChanged"
                                  option-value="short_name"
                                  option-label="short_name"
                                  class="col-1 q-ml-sm"
                        />
                    </div>
                </q-card-section>

                <q-card-section>
                    <div class="text-center">
                        <q-btn color="secondary" outline label="Posodobi predračun" />
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <edit :invoice="invoice" :items="items()"></edit>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

    import Edit from "../tables/Edit";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "EditDialog",
        data() {
            return {
                klavzula: '',
                vat: '',
                maximizedToggle: true,
                vatOptions: [
                    {
                        val: 0,
                        desc: '0'
                    },
                    {
                        val: 9.5,
                        desc: '9.5 %'
                    },
                    {
                        val: 22,
                        desc: '22 %'
                    },
                ]
            }
        },
        computed: {
            ...mapGetters({
                dialog: 'general/getEditInvoiceModal',
                invoice: 'invoices/getInvoice',
                klavzule: 'klavzule/getKlavzule'
            })
        },
        components: {
            Edit
        },
        created() {
          this.$store.dispatch('klavzule/klavzuleAction')
        },
        methods: {
            ...mapActions({
               closeEditDialog: 'general/editInvoiceDialogAction'
            }),
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    type: type
                })
            },
            closeDialog() {
              this.closeEditDialog(false)
            },
            today() {
                return this.$moment().format('Y-MM-DD')
            },
            items() {
                const invoiceItems = this.invoice.items

                if (typeof invoiceItems === 'object') {
                    return Object.keys(invoiceItems)
                        .map(key => invoiceItems[key]);
                }
            },
            kChanged() {
                this.invoice.klavzula = this.klavzula.short_name
                this.showNotif('Klavzula spremenjena', 'positive')
            },
            vChanged() {
                this.invoice.vat = this.vat.val
                this.showNotif('Davek spremenjen', 'positive')
            }
        }
    }
</script>

<style scoped>

</style>
